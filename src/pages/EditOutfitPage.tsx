import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, message, Upload, Form, Select } from 'antd';
import { SaveOutlined, HomeOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import ShowWindow from '../ui/ShowWindow';
import Menubar from '../ui/Menubar';
import ErrorBoundary from '../components/ErrorBoundary';
import DraggableImage from '../components/DraggableImage';
import { DEFAULT_CLOTH_TYPE } from '../utils/constants';
import { preloadImages } from '../data/clothesData';
import { saveOutfit, saveUploadedCloth } from '../utils/storage';
import { getAllCategories } from '../data/clothesData';
import { ClothType, PlacedImage, CategoryType, DraggableImage as DraggableImageType, SelectedClothInfo } from '../types';
import type { UploadProps } from 'antd';
import './pages.css';

// 生成展示板截图的工具函数
function generateThumbnail(draggableImages: DraggableImageType[]): Promise<string> {
  return new Promise((resolve) => {
    if (draggableImages.length === 0) {
      resolve('');
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      resolve('');
      return;
    }

    // 计算边界框
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    draggableImages.forEach(img => {
      minX = Math.min(minX, img.x);
      minY = Math.min(minY, img.y);
      maxX = Math.max(maxX, img.x + img.width);
      maxY = Math.max(maxY, img.y + img.height);
    });

    // 添加padding
    const padding = 20;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = maxX + padding;
    maxY = maxY + padding;

    const width = maxX - minX;
    const height = maxY - minY;

    // 设置画布大小（限制最大尺寸）
    const maxSize = 400;
    const scale = Math.min(1, maxSize / Math.max(width, height));
    canvas.width = width * scale;
    canvas.height = height * scale;

    // 设置白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 加载并绘制所有图片
    const imagePromises = draggableImages.map(imgData => {
      return new Promise<void>((imgResolve) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.save();
          
          // 计算相对位置
          const x = (imgData.x - minX) * scale;
          const y = (imgData.y - minY) * scale;
          const w = imgData.width * scale;
          const h = imgData.height * scale;

          // 应用旋转
          ctx.translate(x + w / 2, y + h / 2);
          ctx.rotate((imgData.rotation * Math.PI) / 180);
          ctx.drawImage(img, -w / 2, -h / 2, w, h);
          
          ctx.restore();
          imgResolve();
        };
        img.onerror = () => imgResolve();
        img.src = imgData.src;
      });
    });

    Promise.all(imagePromises).then(() => {
      resolve(canvas.toDataURL('image/png', 0.8));
    });
  });
}

const { Option } = Select;

export default function EditOutfitPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentCloth, setCurrentCloth] = useState<ClothType>(DEFAULT_CLOTH_TYPE);
  const [selectedCloths, setSelectedCloths] = useState<Record<CategoryType, ClothType | null>>({
    '上装': null,
    '下装': null,
    '配饰': null,
    '鞋类': null
  });
  const [placedImages, setPlacedImages] = useState<PlacedImage[]>([]);
  const [draggableImages, setDraggableImages] = useState<DraggableImageType[]>([]);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [outfitName, setOutfitName] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const categories = getAllCategories();

  const handleClothChange = (clothType: ClothType) => {
    setCurrentCloth(clothType);
  };

  const handleClothSelect = (clothType: ClothType) => {
    // 找到该服饰所属的分类
    const category = categories.find(cat => 
      cat.items.some(item => item.id === clothType)
    );
    
    if (category) {
      setSelectedCloths(prev => ({
        ...prev,
        [category.category]: clothType
      }));
      
      // 添加到可拖拽图片区域
      const item = category.items.find(item => item.id === clothType);
      if (item) {
        const newImage: DraggableImageType = {
          id: `draggable-${Date.now()}-${Math.random()}`,
          src: item.imagePath,
          x: 100 + draggableImages.length * 20,
          y: 100 + draggableImages.length * 20,
          width: 120,
          height: 120,
          rotation: 0,
          clothType: clothType
        };
        setDraggableImages(prev => [...prev, newImage]);
      }
    }
  };

  const handleRemoveCloth = (category: CategoryType) => {
    const clothType = selectedCloths[category];
    setSelectedCloths(prev => ({
      ...prev,
      [category]: null
    }));
    
    // 同时移除对应的可拖拽图片
    if (clothType) {
      setDraggableImages(prev => prev.filter(img => img.clothType !== clothType));
    }
  };

  const handleUpdateDraggableImage = (updatedImage: DraggableImageType) => {
    setDraggableImages(prev => 
      prev.map(img => img.id === updatedImage.id ? updatedImage : img)
    );
  };

  const handleRemoveDraggableImage = (id: string) => {
    setDraggableImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSaveOutfit = async () => {
    if (!outfitName.trim()) {
      message.warning('请输入穿搭名称');
      return;
    }

    // 收集已选服饰的详细信息
    const selectedClothsInfo: SelectedClothInfo[] = [];
    Object.entries(selectedCloths).forEach(([category, clothType]) => {
      if (clothType) {
        const categoryConfig = categories.find(cat => cat.category === category);
        const item = categoryConfig?.items.find(item => item.id === clothType);
        if (item) {
          selectedClothsInfo.push({
            category: category as CategoryType,
            clothType: clothType,
            name: item.name,
            imagePath: item.imagePath
          });
        }
      }
    });

    // 生成展示板截图
    message.loading({ content: '正在生成穿搭预览图...', key: 'saving' });
    const thumbnail = await generateThumbnail(draggableImages);

    const newOutfit = {
      id: `outfit_${Date.now()}`,
      name: outfitName,
      items: [],
      placedImages: placedImages,
      selectedCloths: selectedClothsInfo,
      draggableImages: draggableImages,
      thumbnail: thumbnail,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveOutfit(newOutfit);
    message.success({ content: '穿搭保存成功！', key: 'saving' });
    setSaveModalVisible(false);
    setOutfitName('');
  };

  const uploadProps: UploadProps = {
    name: 'cloth',
    listType: 'picture-card',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('图片大小不能超过 5MB！');
        return false;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
      
      return false;
    },
  };

  const handleUploadSubmit = (values: any) => {
    if (!imageUrl) {
      message.warning('请上传服饰图片');
      return;
    }

    const selectedType = values.clothType as ClothType;
    const category = categories.find(cat => 
      cat.items.some(item => item.id === selectedType)
    );

    const newCloth = {
      id: `cloth_${Date.now()}`,
      name: values.name,
      imagePath: imageUrl,
      category: category?.category || '配饰' as CategoryType,
      clothType: selectedType,
      uploadedAt: new Date().toISOString()
    };

    saveUploadedCloth(newCloth);
    message.success('服饰上传成功！');
    form.resetFields();
    setImageUrl('');
    setUploadModalVisible(false);
    
    // 刷新页面以显示新上传的图片
    window.location.reload();
  };

  useEffect(() => {
    document.title = '编辑穿搭 - 小猫猫的衣橱';
    
    preloadImages()
      .then(() => {
        // 图片预加载完成
      })
      .catch((error) => {
        console.warn('图片预加载失败:', error);
      });
  }, []);

  const handlePlacedImagesChange = (images: PlacedImage[]) => {
    setPlacedImages(images);
  };

  const getCategoryName = (category: CategoryType): string => {
    const cat = categories.find(c => c.category === category);
    return cat?.name || category;
  };

  const getClothName = (clothType: ClothType | null): string => {
    if (!clothType) return '';
    const category = categories.find(cat => 
      cat.items.some(item => item.id === clothType)
    );
    const item = category?.items.find(item => item.id === clothType);
    return item?.name || clothType;
  };

  const getClothImage = (clothType: ClothType | null): string => {
    if (!clothType) return '';
    const category = categories.find(cat => 
      cat.items.some(item => item.id === clothType)
    );
    const item = category?.items.find(item => item.id === clothType);
    return item?.imagePath || `/img/${clothType}.jpg`;
  };

  return (
    <ErrorBoundary>
      <div className="EditOutfitPage">
        <div className="EditOutfitHeader">
          <Button 
            icon={<HomeOutlined />} 
            onClick={() => navigate('/')}
            className="BackButton"
          >
            返回首页
          </Button>
          <span className="EditOutfitTitle">编辑穿搭</span>
          <Button 
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => setSaveModalVisible(true)}
            className="SaveButton"
          >
            保存穿搭
          </Button>
        </div>
        <Menubar onClothChange={handleClothChange} defaultCloth={currentCloth} />
        <ShowWindow 
          clothType={currentCloth} 
          onPlacedImagesChange={handlePlacedImagesChange}
          onClothSelect={handleClothSelect}
          showUploadButton={true}
          onUploadClick={() => setUploadModalVisible(true)}
        />
        
        {/* 可拖拽图片展示区域 */}
        <div className={`DraggableImageArea ${draggableImages.length > 0 ? 'hasImages' : ''}`}>
          {draggableImages.map(image => (
            <DraggableImage
              key={image.id}
              image={image}
              onUpdate={handleUpdateDraggableImage}
              onRemove={handleRemoveDraggableImage}
            />
          ))}
        </div>
        
        {/* 选中衣服展示区域 */}
        <div className="SelectedClothsArea">
          <h3 className="SelectedClothsTitle">已选服饰</h3>
          <div className="SelectedClothsGrid">
            {categories.map(category => {
              const selectedCloth = selectedCloths[category.category];
              if (!selectedCloth) return null;
              
              return (
                <div key={category.category} className="SelectedClothItem">
                  <div className="SelectedClothLabel">{getCategoryName(category.category)}</div>
                  <div className="SelectedClothContent">
                    <Image
                      width={80}
                      height={80}
                      src={getClothImage(selectedCloth)}
                      alt={getClothName(selectedCloth)}
                      preview={false}
                    />
                    <div className="SelectedClothName">{getClothName(selectedCloth)}</div>
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      size="small"
                      className="RemoveClothButton"
                      onClick={() => handleRemoveCloth(category.category)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <Modal
          title="保存穿搭"
          open={saveModalVisible}
          onOk={handleSaveOutfit}
          onCancel={() => {
            setSaveModalVisible(false);
            setOutfitName('');
          }}
          okText="保存"
          cancelText="取消"
        >
          <Input
            placeholder="请输入穿搭名称"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
            onPressEnter={handleSaveOutfit}
          />
        </Modal>

        <Modal
          title="上传服饰"
          open={uploadModalVisible}
          onCancel={() => {
            setUploadModalVisible(false);
            form.resetFields();
            setImageUrl('');
          }}
          footer={null}
          width={400}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUploadSubmit}
          >
            <Form.Item
              label="服饰图片"
              required
            >
              <Upload {...uploadProps}>
                {imageUrl ? (
                  <div className="UploadPreview">
                    <img src={imageUrl} alt="preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                  </div>
                ) : (
                  <div>
                    <UploadOutlined style={{ fontSize: 32 }} />
                    <div style={{ marginTop: 8 }}>点击上传</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label="服饰名称"
              name="name"
              rules={[{ required: true, message: '请输入服饰名称' }]}
            >
              <Input placeholder="请输入服饰名称" />
            </Form.Item>

            <Form.Item
              label="服饰类型"
              name="clothType"
              rules={[{ required: true, message: '请选择服饰类型' }]}
            >
              <Select placeholder="请选择服饰类型" showSearch>
                {categories.map(category => (
                  <Select.OptGroup key={category.category} label={category.name}>
                    {category.items.map(item => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select.OptGroup>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                size="large"
              >
                上传服饰
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ErrorBoundary>
  );
}
