"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/upload/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/upload/index!./src/pages/upload/index.tsx":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/upload/index!./src/pages/upload/index.tsx ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Upload; }
/* harmony export */ });
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/storage */ "./src/utils/storage.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);









var categories = [{
  category: '上装',
  name: '上装',
  types: [{
    id: '内搭',
    name: '内搭'
  }, {
    id: '外套',
    name: '外套'
  }]
}, {
  category: '下装',
  name: '下装',
  types: [{
    id: '裤子',
    name: '裤子'
  }, {
    id: '裙子',
    name: '裙子'
  }]
}, {
  category: '鞋类',
  name: '鞋类',
  types: [{
    id: '鞋子',
    name: '鞋子'
  }, {
    id: '袜子',
    name: '袜子'
  }]
}, {
  category: '配饰',
  name: '配饰',
  types: [{
    id: '帽子',
    name: '帽子'
  }, {
    id: '包包',
    name: '包包'
  }, {
    id: '墨镜',
    name: '墨镜'
  }, {
    id: '耳环',
    name: '耳环'
  }, {
    id: '项链',
    name: '项链'
  }]
}];

// 构建选择器数据
var categoryNames = categories.map(function (c) {
  return c.name;
});
var allTypes = categories.map(function (c) {
  return c.types.map(function (t) {
    return t.name;
  });
});
function Upload() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(''),
    _useState2 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
    imageUrl = _useState2[0],
    setImageUrl = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(''),
    _useState4 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
    name = _useState4[0],
    setName = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(0),
    _useState6 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState5, 2),
    categoryIndex = _useState6[0],
    setCategoryIndex = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(0),
    _useState8 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState7, 2),
    typeIndex = _useState8[0],
    setTypeIndex = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false),
    _useState0 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState9, 2),
    loading = _useState0[0],
    setLoading = _useState0[1];
  var handleChooseImage = function handleChooseImage() {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_4___default().chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function success(res) {
        var tempFilePath = res.tempFilePaths[0];
        // 转换为base64
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_4___default().getFileSystemManager().readFile({
          filePath: tempFilePath,
          encoding: 'base64',
          success: function success(data) {
            var base64 = "data:image/jpeg;base64,".concat(data.data);
            setImageUrl(base64);
          }
        });
      }
    });
  };
  var handleCategoryChange = function handleCategoryChange(e) {
    var index = parseInt(e.detail.value);
    setCategoryIndex(index);
    setTypeIndex(0); // 重置类型选择
  };
  var handleTypeChange = function handleTypeChange(e) {
    setTypeIndex(parseInt(e.detail.value));
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee() {
      var selectedCategory, selectedType, _t;
      return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (imageUrl) {
              _context.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_4___default().showToast({
              title: '请上传图片',
              icon: 'none'
            });
            return _context.a(2);
          case 1:
            if (name) {
              _context.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_4___default().showToast({
              title: '请输入服饰名称',
              icon: 'none'
            });
            return _context.a(2);
          case 2:
            setLoading(true);
            _context.p = 3;
            selectedCategory = categories[categoryIndex];
            selectedType = selectedCategory.types[typeIndex];
            _context.n = 4;
            return (0,_utils_storage__WEBPACK_IMPORTED_MODULE_6__.saveUploadedCloth)({
              id: "cloth_".concat(Date.now()),
              name: name,
              imagePath: imageUrl,
              category: selectedCategory.category,
              clothType: selectedType.id,
              uploadedAt: new Date().toISOString()
            });
          case 4:
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_4___default().showToast({
              title: '上传成功',
              icon: 'success'
            });

            // 重置表单
            setImageUrl('');
            setName('');
            setCategoryIndex(0);
            setTypeIndex(0);
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_4___default().showToast({
              title: '上传失败',
              icon: 'none'
            });
          case 6:
            _context.p = 6;
            setLoading(false);
            return _context.f(6);
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[3, 5, 6, 7]]);
    }));
    return function handleSubmit() {
      return _ref.apply(this, arguments);
    };
  }();
  var currentTypes = allTypes[categoryIndex] || [];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
    className: "upload-page",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
      className: "upload-card",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
        className: "image-section",
        onClick: handleChooseImage,
        children: imageUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Image, {
          src: imageUrl,
          mode: "aspectFit",
          className: "preview-image"
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
          className: "upload-placeholder",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
            className: "upload-icon",
            children: "\uD83D\uDCF7"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
            className: "upload-text",
            children: "\u70B9\u51FB\u4E0A\u4F20\u670D\u9970\u56FE\u7247"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
        className: "form",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
          className: "form-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
            className: "label",
            children: "\u670D\u9970\u540D\u79F0"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Input, {
            className: "input",
            placeholder: "\u8BF7\u8F93\u5165\u670D\u9970\u540D\u79F0",
            value: name,
            onInput: function onInput(e) {
              return setName(e.detail.value);
            }
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
          className: "form-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
            className: "label",
            children: "\u670D\u9970\u5206\u7C7B"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Picker, {
            mode: "selector",
            range: categoryNames,
            value: categoryIndex,
            onChange: handleCategoryChange,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
              className: "picker",
              children: [categoryNames[categoryIndex], /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
                className: "picker-arrow",
                children: "\u25BC"
              })]
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
          className: "form-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
            className: "label",
            children: "\u670D\u9970\u7C7B\u578B"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Picker, {
            mode: "selector",
            range: currentTypes,
            value: typeIndex,
            onChange: handleTypeChange,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
              className: "picker",
              children: [currentTypes[typeIndex], /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.Text, {
                className: "picker-arrow",
                children: "\u25BC"
              })]
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_3__.View, {
        className: "btn btn-primary ".concat(loading ? 'loading' : ''),
        onClick: handleSubmit,
        children: loading ? '上传中...' : '上传服饰'
      })]
    })
  });
}

/***/ }),

/***/ "./src/pages/upload/index.tsx":
/*!************************************!*\
  !*** ./src/pages/upload/index.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_upload_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/upload/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/upload/index!./src/pages/upload/index.tsx");


var config = {"navigationBarTitleText":"上传服饰"};


var inst = Page((0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_upload_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/upload/index', {root:{cn:[]}}, config || {}))


/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_upload_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/upload/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map