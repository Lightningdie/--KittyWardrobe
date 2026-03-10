"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/login/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/login/index!./src/pages/login/index.tsx":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/login/index!./src/pages/login/index.tsx ***!
  \****************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Login; }
/* harmony export */ });
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/regenerator.js */ "./node_modules/@babel/runtime/helpers/esm/regenerator.js");
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tarojs/taro */ "webpack/container/remote/@tarojs/taro");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "webpack/container/remote/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/api */ "./src/services/api.ts");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "webpack/container/remote/react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);










function Login() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)('login'),
    _useState2 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false),
    _useState4 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];

  // 登录表单
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)({
      username: '',
      password: ''
    }),
    _useState6 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState5, 2),
    loginForm = _useState6[0],
    setLoginForm = _useState6[1];

  // 注册表单
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)({
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
      email: '',
      phone: ''
    }),
    _useState8 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState7, 2),
    registerForm = _useState8[0],
    setRegisterForm = _useState8[1];
  var handleLogin = /*#__PURE__*/function () {
    var _ref = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])().m(function _callee() {
      var response, _t;
      return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!(!loginForm.username || !loginForm.password)) {
              _context.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().showToast({
              title: '请填写用户名和密码',
              icon: 'none'
            });
            return _context.a(2);
          case 1:
            setLoading(true);
            _context.p = 2;
            _context.n = 3;
            return (0,_services_api__WEBPACK_IMPORTED_MODULE_7__.login)({
              username: loginForm.username,
              password: loginForm.password
            });
          case 3:
            response = _context.v;
            if (response.success) {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().setStorageSync('clothes_change_user', response.data.user);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().showToast({
                title: '登录成功',
                icon: 'success'
              });
              setTimeout(function () {
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().switchTab({
                  url: '/pages/index/index'
                });
              }, 1500);
            }
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().showToast({
              title: _t.message || '登录失败',
              icon: 'none'
            });
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4, 5, 6]]);
    }));
    return function handleLogin() {
      return _ref.apply(this, arguments);
    };
  }();
  var handleRegister = /*#__PURE__*/function () {
    var _ref2 = (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/(0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])().m(function _callee2() {
      var response, _t2;
      return (0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_regenerator_js__WEBPACK_IMPORTED_MODULE_1__["default"])().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (!(!registerForm.username || !registerForm.password)) {
              _context2.n = 1;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().showToast({
              title: '请填写用户名和密码',
              icon: 'none'
            });
            return _context2.a(2);
          case 1:
            if (!(registerForm.password !== registerForm.confirmPassword)) {
              _context2.n = 2;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().showToast({
              title: '两次密码输入不一致',
              icon: 'none'
            });
            return _context2.a(2);
          case 2:
            if (!(registerForm.password.length < 6)) {
              _context2.n = 3;
              break;
            }
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().showToast({
              title: '密码至少6位',
              icon: 'none'
            });
            return _context2.a(2);
          case 3:
            setLoading(true);
            _context2.p = 4;
            _context2.n = 5;
            return (0,_services_api__WEBPACK_IMPORTED_MODULE_7__.register)({
              username: registerForm.username,
              password: registerForm.password,
              name: registerForm.name,
              email: registerForm.email,
              phone: registerForm.phone
            });
          case 5:
            response = _context2.v;
            if (response.success) {
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().setStorageSync('clothes_change_user', response.data.user);
              _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().showToast({
                title: '注册成功',
                icon: 'success'
              });
              setTimeout(function () {
                _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().switchTab({
                  url: '/pages/index/index'
                });
              }, 1500);
            }
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t2 = _context2.v;
            _tarojs_taro__WEBPACK_IMPORTED_MODULE_5___default().showToast({
              title: _t2.message || '注册失败',
              icon: 'none'
            });
          case 7:
            _context2.p = 7;
            setLoading(false);
            return _context2.f(7);
          case 8:
            return _context2.a(2);
        }
      }, _callee2, null, [[4, 6, 7, 8]]);
    }));
    return function handleRegister() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
    className: "login-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
      className: "login-header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
        className: "login-title",
        children: "\u5C0F\u732B\u732B\u7684\u8863\u6A71"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Text, {
        className: "login-subtitle",
        children: "\u8BB0\u5F55\u4F60\u7684\u6BCF\u4E00\u6B21\u7A7F\u642D"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
      className: "login-card",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
        className: "tabs",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "tab ".concat(activeTab === 'login' ? 'active' : ''),
          onClick: function onClick() {
            return setActiveTab('login');
          },
          children: "\u767B\u5F55"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "tab ".concat(activeTab === 'register' ? 'active' : ''),
          onClick: function onClick() {
            return setActiveTab('register');
          },
          children: "\u6CE8\u518C"
        })]
      }), activeTab === 'login' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
        className: "form",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "form-item",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Input, {
            className: "input",
            placeholder: "\u7528\u6237\u540D",
            value: loginForm.username,
            onInput: function onInput(e) {
              return setLoginForm((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, loginForm), {}, {
                username: e.detail.value
              }));
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "form-item",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Input, {
            className: "input",
            placeholder: "\u5BC6\u7801",
            password: true,
            value: loginForm.password,
            onInput: function onInput(e) {
              return setLoginForm((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, loginForm), {}, {
                password: e.detail.value
              }));
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "btn btn-primary ".concat(loading ? 'loading' : ''),
          onClick: handleLogin,
          children: loading ? '登录中...' : '登录'
        })]
      }), activeTab === 'register' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
        className: "form",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "form-item",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Input, {
            className: "input",
            placeholder: "\u7528\u6237\u540D",
            value: registerForm.username,
            onInput: function onInput(e) {
              return setRegisterForm((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, registerForm), {}, {
                username: e.detail.value
              }));
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "form-item",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Input, {
            className: "input",
            placeholder: "\u5BC6\u7801",
            password: true,
            value: registerForm.password,
            onInput: function onInput(e) {
              return setRegisterForm((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, registerForm), {}, {
                password: e.detail.value
              }));
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "form-item",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Input, {
            className: "input",
            placeholder: "\u786E\u8BA4\u5BC6\u7801",
            password: true,
            value: registerForm.confirmPassword,
            onInput: function onInput(e) {
              return setRegisterForm((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, registerForm), {}, {
                confirmPassword: e.detail.value
              }));
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "form-item",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Input, {
            className: "input",
            placeholder: "\u6635\u79F0\uFF08\u9009\u586B\uFF09",
            value: registerForm.name,
            onInput: function onInput(e) {
              return setRegisterForm((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, registerForm), {}, {
                name: e.detail.value
              }));
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "form-item",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Input, {
            className: "input",
            placeholder: "\u90AE\u7BB1\uFF08\u9009\u586B\uFF09",
            value: registerForm.email,
            onInput: function onInput(e) {
              return setRegisterForm((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, registerForm), {}, {
                email: e.detail.value
              }));
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "form-item",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.Input, {
            className: "input",
            placeholder: "\u624B\u673A\u53F7\uFF08\u9009\u586B\uFF09",
            type: "number",
            value: registerForm.phone,
            onInput: function onInput(e) {
              return setRegisterForm((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_liuhy_project_clothes_change_miniprogram_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, registerForm), {}, {
                phone: e.detail.value
              }));
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_4__.View, {
          className: "btn btn-primary ".concat(loading ? 'loading' : ''),
          onClick: handleRegister,
          children: loading ? '注册中...' : '注册'
        })]
      })]
    })]
  });
}

/***/ }),

/***/ "./src/pages/login/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/login/index.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "webpack/container/remote/@tarojs/runtime");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_login_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/login/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/login/index!./src/pages/login/index.tsx");


var config = {"navigationBarTitleText":"登录","navigationStyle":"custom"};


var inst = Page((0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_login_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/login/index', {root:{cn:[]}}, config || {}))


/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_login_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors","common"], function() { return __webpack_exec__("./src/pages/login/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map