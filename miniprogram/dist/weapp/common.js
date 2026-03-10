"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteClothFromServer: function() { return /* binding */ deleteClothFromServer; },
/* harmony export */   deleteOutfitFromServer: function() { return /* binding */ deleteOutfitFromServer; },
/* harmony export */   isLoggedIn: function() { return /* binding */ isLoggedIn; },
/* harmony export */   login: function() { return /* binding */ login; },
/* harmony export */   logout: function() { return /* binding */ logout; },
/* harmony export */   register: function() { return /* binding */ register; },
/* harmony export */   saveOutfitToServer: function() { return /* binding */ saveOutfitToServer; },
/* harmony export */   updateProfile: function() { return /* binding */ updateProfile; },
/* harmony export */   uploadClothToServer: function() { return /* binding */ uploadClothToServer; }
/* harmony export */ });
/* unused harmony exports getToken, setToken, removeToken, getCurrentUser, getOutfits, getCloths */
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__);


// API 服务层 - 小程序版本


// 后端服务器地址 - 请根据实际情况修改
var API_BASE_URL = 'https://your-server.com/api';

// Token 管理
var TOKEN_KEY = 'clothes_change_token';
function getToken() {
  return _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getStorageSync(TOKEN_KEY) || null;
}
function setToken(token) {
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().setStorageSync(TOKEN_KEY, token);
}
function removeToken() {
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().removeStorageSync(TOKEN_KEY);
}
function isLoggedIn() {
  return !!getToken();
}

// 通用请求方法
function request(_x) {
  return _request.apply(this, arguments);
} // ==================== 认证相关 API ====================
function _request() {
  _request = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee(endpoint) {
    var options,
      token,
      header,
      response,
      _response$data,
      _args = arguments,
      _t;
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          token = getToken();
          header = {
            'Content-Type': 'application/json'
          };
          if (token) {
            header['Authorization'] = "Bearer ".concat(token);
          }
          _context.p = 1;
          _context.n = 2;
          return _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().request({
            url: "".concat(API_BASE_URL).concat(endpoint),
            method: options.method || 'GET',
            data: options.data,
            header: header
          });
        case 2:
          response = _context.v;
          if (!(response.statusCode >= 400)) {
            _context.n = 3;
            break;
          }
          throw new Error(((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.message) || '请求失败');
        case 3:
          return _context.a(2, response.data);
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error('API请求失败:', _t);
          throw _t;
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[1, 4]]);
  }));
  return _request.apply(this, arguments);
}
// 登录
function login(_x2) {
  return _login.apply(this, arguments);
}

// 注册
function _login() {
  _login = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee2(data) {
    var response;
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return request('/auth/login', {
            method: 'POST',
            data: data
          });
        case 1:
          response = _context2.v;
          if (response.success && response.data.token) {
            setToken(response.data.token);
          }
          return _context2.a(2, response);
      }
    }, _callee2);
  }));
  return _login.apply(this, arguments);
}
function register(_x3) {
  return _register.apply(this, arguments);
}

// 登出
function _register() {
  _register = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee3(data) {
    var response;
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return request('/auth/register', {
            method: 'POST',
            data: data
          });
        case 1:
          response = _context3.v;
          if (response.success && response.data.token) {
            setToken(response.data.token);
          }
          return _context3.a(2, response);
      }
    }, _callee3);
  }));
  return _register.apply(this, arguments);
}
function logout() {
  removeToken();
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().removeStorageSync('clothes_change_user');
}

// 获取当前用户信息
function getCurrentUser() {
  return _getCurrentUser.apply(this, arguments);
}

// 更新用户信息
function _getCurrentUser() {
  _getCurrentUser = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee4() {
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          return _context4.a(2, request('/auth/me'));
      }
    }, _callee4);
  }));
  return _getCurrentUser.apply(this, arguments);
}
function updateProfile(_x4) {
  return _updateProfile.apply(this, arguments);
}

// ==================== 穿搭相关 API ====================
function _updateProfile() {
  _updateProfile = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee5(data) {
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          return _context5.a(2, request('/auth/profile', {
            method: 'PUT',
            data: data
          }));
      }
    }, _callee5);
  }));
  return _updateProfile.apply(this, arguments);
}
// 获取穿搭列表
function getOutfits() {
  return _getOutfits.apply(this, arguments);
}

// 保存穿搭
function _getOutfits() {
  _getOutfits = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee6() {
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          return _context6.a(2, request('/outfits'));
      }
    }, _callee6);
  }));
  return _getOutfits.apply(this, arguments);
}
function saveOutfitToServer(_x5) {
  return _saveOutfitToServer.apply(this, arguments);
}

// 删除穿搭
function _saveOutfitToServer() {
  _saveOutfitToServer = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee7(outfit) {
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          return _context7.a(2, request('/outfits', {
            method: 'POST',
            data: outfit
          }));
      }
    }, _callee7);
  }));
  return _saveOutfitToServer.apply(this, arguments);
}
function deleteOutfitFromServer(_x6) {
  return _deleteOutfitFromServer.apply(this, arguments);
}

// ==================== 服饰相关 API ====================
function _deleteOutfitFromServer() {
  _deleteOutfitFromServer = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee8(outfitId) {
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          return _context8.a(2, request("/outfits/".concat(outfitId), {
            method: 'DELETE'
          }));
      }
    }, _callee8);
  }));
  return _deleteOutfitFromServer.apply(this, arguments);
}
// 获取服饰列表
function getCloths() {
  return _getCloths.apply(this, arguments);
}

// 上传服饰
function _getCloths() {
  _getCloths = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee9() {
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          return _context9.a(2, request('/cloths'));
      }
    }, _callee9);
  }));
  return _getCloths.apply(this, arguments);
}
function uploadClothToServer(_x7) {
  return _uploadClothToServer.apply(this, arguments);
}

// 删除服饰
function _uploadClothToServer() {
  _uploadClothToServer = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee0(cloth) {
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          return _context0.a(2, request('/cloths', {
            method: 'POST',
            data: cloth
          }));
      }
    }, _callee0);
  }));
  return _uploadClothToServer.apply(this, arguments);
}
function deleteClothFromServer(_x8) {
  return _deleteClothFromServer.apply(this, arguments);
}
function _deleteClothFromServer() {
  _deleteClothFromServer = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee1(clothId) {
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          return _context1.a(2, request("/cloths/".concat(clothId), {
            method: 'DELETE'
          }));
      }
    }, _callee1);
  }));
  return _deleteClothFromServer.apply(this, arguments);
}

/***/ }),

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearUserData: function() { return /* binding */ clearUserData; },
/* harmony export */   deleteOutfit: function() { return /* binding */ deleteOutfit; },
/* harmony export */   getSavedOutfits: function() { return /* binding */ getSavedOutfits; },
/* harmony export */   getUploadedCloths: function() { return /* binding */ getUploadedCloths; },
/* harmony export */   getUserInfo: function() { return /* binding */ getUserInfo; },
/* harmony export */   saveOutfit: function() { return /* binding */ saveOutfit; },
/* harmony export */   saveUploadedCloth: function() { return /* binding */ saveUploadedCloth; },
/* harmony export */   saveUserInfo: function() { return /* binding */ saveUserInfo; }
/* harmony export */ });
/* unused harmony exports getOutfitById, deleteUploadedCloth */
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");


// 小程序本地存储工具函数


var STORAGE_KEYS = {
  OUTFITS: 'clothes_change_outfits',
  USER_INFO: 'clothes_change_user_info',
  UPLOADED_CLOTHS: 'clothes_change_uploaded_cloths',
  USER: 'clothes_change_user'
};

// ==================== 穿搭存储 ====================

function saveOutfit(_x) {
  return _saveOutfit.apply(this, arguments);
}
function _saveOutfit() {
  _saveOutfit = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee(outfit) {
    var _t;
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          saveOutfitLocal(outfit);
          if (!_services_api__WEBPACK_IMPORTED_MODULE_3__.isLoggedIn()) {
            _context.n = 4;
            break;
          }
          _context.p = 1;
          _context.n = 2;
          return _services_api__WEBPACK_IMPORTED_MODULE_3__.saveOutfitToServer({
            id: outfit.id,
            name: outfit.name,
            items: outfit.items,
            placedImages: outfit.placedImages,
            thumbnail: outfit.thumbnail
          });
        case 2:
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.warn('同步穿搭到服务器失败:', _t);
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3]]);
  }));
  return _saveOutfit.apply(this, arguments);
}
function saveOutfitLocal(outfit) {
  var outfits = getSavedOutfitsLocal();
  var existingIndex = outfits.findIndex(function (o) {
    return o.id === outfit.id;
  });
  if (existingIndex >= 0) {
    outfits[existingIndex] = outfit;
  } else {
    outfits.push(outfit);
  }
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().setStorageSync(STORAGE_KEYS.OUTFITS, outfits);
}
function getSavedOutfits() {
  return getSavedOutfitsLocal();
}
function getSavedOutfitsLocal() {
  return _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getStorageSync(STORAGE_KEYS.OUTFITS) || [];
}
function deleteOutfit(_x2) {
  return _deleteOutfit.apply(this, arguments);
}
function _deleteOutfit() {
  _deleteOutfit = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee2(outfitId) {
    var _t2;
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          deleteOutfitLocal(outfitId);
          if (!_services_api__WEBPACK_IMPORTED_MODULE_3__.isLoggedIn()) {
            _context2.n = 4;
            break;
          }
          _context2.p = 1;
          _context2.n = 2;
          return _services_api__WEBPACK_IMPORTED_MODULE_3__.deleteOutfitFromServer(outfitId);
        case 2:
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          console.warn('从服务器删除穿搭失败:', _t2);
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return _deleteOutfit.apply(this, arguments);
}
function deleteOutfitLocal(outfitId) {
  var outfits = getSavedOutfitsLocal();
  var filtered = outfits.filter(function (o) {
    return o.id !== outfitId;
  });
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().setStorageSync(STORAGE_KEYS.OUTFITS, filtered);
}
function getOutfitById(outfitId) {
  var outfits = getSavedOutfitsLocal();
  return outfits.find(function (o) {
    return o.id === outfitId;
  }) || null;
}

// ==================== 用户信息存储 ====================

function saveUserInfo(_x3) {
  return _saveUserInfo.apply(this, arguments);
}
function _saveUserInfo() {
  _saveUserInfo = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee3(userInfo) {
    var _t3;
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().setStorageSync(STORAGE_KEYS.USER_INFO, userInfo);
          if (!_services_api__WEBPACK_IMPORTED_MODULE_3__.isLoggedIn()) {
            _context3.n = 4;
            break;
          }
          _context3.p = 1;
          _context3.n = 2;
          return _services_api__WEBPACK_IMPORTED_MODULE_3__.updateProfile({
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            avatar: userInfo.avatar
          });
        case 2:
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t3 = _context3.v;
          console.warn('同步用户信息到服务器失败:', _t3);
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 3]]);
  }));
  return _saveUserInfo.apply(this, arguments);
}
function getUserInfo() {
  var userData = _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getStorageSync(STORAGE_KEYS.USER);
  if (userData) {
    return {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      avatar: userData.avatar
    };
  }
  return _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getStorageSync(STORAGE_KEYS.USER_INFO) || null;
}

// ==================== 上传服饰存储 ====================

function saveUploadedCloth(_x4) {
  return _saveUploadedCloth.apply(this, arguments);
}
function _saveUploadedCloth() {
  _saveUploadedCloth = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee4(cloth) {
    var _t4;
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          saveUploadedClothLocal(cloth);
          if (!_services_api__WEBPACK_IMPORTED_MODULE_3__.isLoggedIn()) {
            _context4.n = 4;
            break;
          }
          _context4.p = 1;
          _context4.n = 2;
          return _services_api__WEBPACK_IMPORTED_MODULE_3__.uploadClothToServer({
            id: cloth.id,
            name: cloth.name,
            imagePath: cloth.imagePath,
            category: cloth.category,
            clothType: cloth.clothType
          });
        case 2:
          _context4.n = 4;
          break;
        case 3:
          _context4.p = 3;
          _t4 = _context4.v;
          console.warn('同步服饰到服务器失败:', _t4);
        case 4:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 3]]);
  }));
  return _saveUploadedCloth.apply(this, arguments);
}
function saveUploadedClothLocal(cloth) {
  var cloths = getUploadedClothsLocal();
  cloths.push(cloth);
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().setStorageSync(STORAGE_KEYS.UPLOADED_CLOTHS, cloths);
}
function getUploadedCloths() {
  return getUploadedClothsLocal();
}
function getUploadedClothsLocal() {
  return _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getStorageSync(STORAGE_KEYS.UPLOADED_CLOTHS) || [];
}
function deleteUploadedCloth(_x5) {
  return _deleteUploadedCloth.apply(this, arguments);
}
function _deleteUploadedCloth() {
  _deleteUploadedCloth = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().m(function _callee5(clothId) {
    var _t5;
    return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          deleteUploadedClothLocal(clothId);
          if (!_services_api__WEBPACK_IMPORTED_MODULE_3__.isLoggedIn()) {
            _context5.n = 4;
            break;
          }
          _context5.p = 1;
          _context5.n = 2;
          return _services_api__WEBPACK_IMPORTED_MODULE_3__.deleteClothFromServer(clothId);
        case 2:
          _context5.n = 4;
          break;
        case 3:
          _context5.p = 3;
          _t5 = _context5.v;
          console.warn('从服务器删除服饰失败:', _t5);
        case 4:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 3]]);
  }));
  return _deleteUploadedCloth.apply(this, arguments);
}
function deleteUploadedClothLocal(clothId) {
  var cloths = getUploadedClothsLocal();
  var filtered = cloths.filter(function (c) {
    return c.id !== clothId;
  });
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().setStorageSync(STORAGE_KEYS.UPLOADED_CLOTHS, filtered);
}

// ==================== 登出清理 ====================

function clearUserData() {
  _services_api__WEBPACK_IMPORTED_MODULE_3__.logout();
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().removeStorageSync(STORAGE_KEYS.USER);
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().removeStorageSync(STORAGE_KEYS.USER_INFO);
}

/***/ })

}]);
//# sourceMappingURL=common.js.map