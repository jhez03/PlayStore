/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block-header/block.json":
/*!*************************************!*\
  !*** ./src/block-header/block.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/block-header","version":"0.1.1","title":"Header","category":"gamestore","icon":"layout","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false,"innerBlocks":true},"attributes":{"memberLink":{"type":"string"},"cartLink":{"type":"string"},"logo":{"type":"object"},"selectedMenu":{"type":"string","default":""},"menuItems":{"type":"array","default":[]}},"textdomain":"block-playstore","editorScript":"file:./index.js","editorStyle":"file:./index.css","render":"file:./render.php","style":"file:./style-index.css","viewScript":"file:./view.js"}');

/***/ }),

/***/ "./src/block-header/edit.js":
/*!**********************************!*\
  !*** ./src/block-header/edit.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/block-header/editor.scss");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function buildMenuTree(menuItems) {
  const itemsById = {};
  const tree = [];
  menuItems.forEach(item => {
    itemsById[item.id] = {
      ...item,
      children: []
    };
  });
  menuItems.forEach(item => {
    if (item.parent && itemsById[item.parent]) {
      itemsById[item.parent].children.push(itemsById[item.id]);
    } else {
      tree.push(itemsById[item.id]);
    }
  });
  return tree;
}
function renderMenuTree(items, level = 0) {
  const ulClass = level === 0 ? "playstore-nav-links" : "sub-menu";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ul", {
    className: ulClass,
    children: items.map(item => {
      const hasChildren = item.children && item.children.length > 0;
      const liClass = hasChildren ? "menu-item-has-children" : "";
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("li", {
        className: liClass,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: item.url,
          children: item.title.rendered
        }), hasChildren && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
            className: "dropdown-icon playstore-submenu-toggle",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "25",
              viewBox: "0 0 24 25",
              fill: "var(--action-main-svg, rgb(14,13,15))",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                d: "M8.46997 11.2402L12 14.7602L15.53 11.2402",
                stroke: "var(--action-main-svg, rgb(14,13,15))",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })
          }), renderMenuTree(item.children, level + 1)]
        })]
      }, item.id);
    })
  });
}
function Edit({
  attributes,
  setAttributes
}) {
  const memberLink = attributes.memberLink || "";
  const cartLink = attributes.cartLink || "";
  const logo = attributes.logo || "";

  // Fetch available menus from REST API
  const menus = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return select("core").getEntityRecords("taxonomy", "nav_menu");
  }, []);

  // Fetch menu items for the selected menu
  const menuItems = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    if (!attributes.selectedMenu) return [];
    return select("core").getEntityRecords("postType", "nav_menu_item", {
      menus: [attributes.selectedMenu],
      per_page: -1
    });
  }, [attributes.selectedMenu]);
  // Update menuItems attribute when fetched
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (menuItems) {
      setAttributes({
        menuItems
      });
    }
  }, [menuItems]);

  // Build menu options for SelectControl
  const menuOptions = menus ? menus.map(menu => ({
    label: menu.name,
    value: menu.id
  })) : [];

  // Build tree only if menuItems is loaded and not null
  const tree = menuItems && menuItems.length > 0 ? buildMenuTree(menuItems) : [];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)(),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: "Menu Settings",
          initialOpen: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            label: "Select Menu",
            value: attributes.selectedMenu,
            options: [{
              label: "Select a menu",
              value: ""
            }, ...menuOptions],
            onChange: value => setAttributes({
              selectedMenu: value
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: "Block Settings",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: "Member Link",
            value: memberLink,
            onChange: value => setAttributes({
              memberLink: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: "Cart Link",
            value: cartLink,
            onChange: value => setAttributes({
              cartLink: value
            })
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUploadCheck, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
          onSelect: media => setAttributes({
            logo: media
          }),
          allowedTypes: ["image"],
          value: logo?.id,
          render: ({
            open
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            onClick: open,
            variant: "secondary",
            children: logo ? "Change Logo" : "Upload Logo"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "playstore-header",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "px-4 sm:px-6 lg:px-8",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "flex items-center justify-between h-16",
            children: [logo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
              src: logo.url,
              alt: "Logo",
              className: "header-logo"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("nav", {
              className: "hidden lg:flex items-center space-x-8",
              children: tree.length > 0 ? renderMenuTree(tree) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                children: "Select a menu to display navigation items."
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "flex items-center space-x-4",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "header-search",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M22.29 21.66L17.61 16.95C20.97 13.2 20.7 7.44002 16.95 4.05002C13.2 0.660021 7.44002 0.960021 4.05002 4.71002C0.660021 8.46002 0.960021 14.22 4.71002 17.61C8.19002 20.76 13.5 20.76 16.98 17.61L21.69 22.32L22.29 21.66ZM10.83 19.05C6.30002 19.05 2.61002 15.36 2.61002 10.83C2.61002 6.27002 6.30002 2.61002 10.83 2.61002C15.36 2.61002 19.05 6.30002 19.05 10.83C19.05 15.36 15.36 19.05 10.83 19.05Z",
                    fill: "var(--action-main-svg, rgb(14,13,15))",
                    fillOpacity: "0.64"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M10.8301 3.83984V4.73984C14.1901 4.73984 16.9201 7.46984 16.9201 10.8298H17.8201C17.8201 6.95984 14.7001 3.83984 10.8301 3.83984Z",
                    fill: "var(--action-main-svg, rgb(14,13,15))",
                    fillOpacity: "0.64"
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                className: "item-center",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "36",
                  height: "36",
                  viewBox: "0 0 20 25",
                  fill: "none",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M13 18.5V6.5",
                    stroke: "#0E0D0F",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M1 12.5H4",
                    stroke: "#0E0D0F",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M4.50977 4.01025L6.63977 6.14025",
                    stroke: "#0E0D0F",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M13 0.5V3.5",
                    stroke: "#0E0D0F",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M13 24.5V21.5",
                    stroke: "#0E0D0F",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M4.50977 20.9899L6.63977 18.8599",
                    stroke: "#0E0D0F",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M13 18.5C16.3137 18.5 19 15.8137 19 12.5C19 9.18629 16.3137 6.5 13 6.5C9.68629 6.5 7 9.18629 7 12.5C7 15.8137 9.68629 18.5 13 18.5Z",
                    stroke: "#0E0D0F",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "36",
                  height: "36",
                  viewBox: "0 0 20 25",
                  fill: "none",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M13 18.5V6.5",
                    stroke: "white",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M1 12.5H4",
                    stroke: "white",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M4.50977 4.01025L6.63977 6.14025",
                    stroke: "white",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M13 0.5V3.5",
                    stroke: "white",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M13 24.5V21.5",
                    stroke: "white",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M4.50977 20.9899L6.63977 18.8599",
                    stroke: "white",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                    d: "M13 18.5C16.3137 18.5 19 15.8137 19 12.5C19 9.18629 16.3137 6.5 13 6.5C9.68629 6.5 7 9.18629 7 12.5C7 15.8137 9.68629 18.5 13 18.5Z",
                    stroke: "white",
                    "stroke-opacity": "0.64",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })]
                })]
              }), cartLink && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "header-cart-link",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
                  href: cartLink,
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "26",
                    height: "20",
                    viewBox: "0 0 26 20",
                    fill: "none",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                      d: "M2.71436 6.57178L4.42864 18.5718H21.5715L23.2858 6.57178",
                      stroke: "var(--action-main-svg, rgb(14, 13, 15))",
                      strokeOpacity: "0.64",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                      d: "M7.85693 8.28585L9.57122 1.42871",
                      stroke: "var(--action-main-svg, rgb(14, 13, 15))",
                      strokeOpacity: "0.64",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                      d: "M18.143 8.28585L16.4287 1.42871",
                      stroke: "var(--action-main-svg, rgb(14, 13, 15))",
                      strokeOpacity: "0.64",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                      d: "M1 6.57178H25",
                      stroke: "var(--action-main-svg, rgb(14, 13, 15))",
                      strokeOpacity: "0.64",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })]
                  })
                })
              }), memberLink && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "header-member-link",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
                  href: memberLink,
                  children: "Member Area"
                })
              })]
            })]
          })
        })
      })]
    })
  });
}

/***/ }),

/***/ "./src/block-header/editor.scss":
/*!**************************************!*\
  !*** ./src/block-header/editor.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/block-header/style.scss":
/*!*************************************!*\
  !*** ./src/block-header/style.scss ***!
  \*************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nHookWebpackError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nExpected expression.\n\u001b[34m   ╷\u001b[0m\n\u001b[34m48 │\u001b[0m             background-image:\u001b[31m\u001b[0m;\n\u001b[34m   │\u001b[0m \u001b[31m                             ^\u001b[0m\n\u001b[34m   ╵\u001b[0m\n  src/block-header/style.scss 48:21  root stylesheet\n    at tryRunOrWebpackError (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/HookWebpackError.js:86:9)\n    at __webpack_require_module__ (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5464:12)\n    at __webpack_require__ (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5411:18)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5498:20\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3485:9)\n    at done (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3527:9)\n    at Hook.eval [as callAsync] (eval at create (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/Hook.js:20:14)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5386:43\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3463:5)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5348:16\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3485:9)\n    at timesSync (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3463:5)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5316:15\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3485:9)\n    at done (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3527:9)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5262:8\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:3677:6\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/HookWebpackError.js:67:2\n    at Hook.eval [as callAsync] (eval at create (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Cache.store (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Cache.js:113:20)\n    at ItemCacheFacade.store (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/CacheFacade.js:142:15)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:3676:11\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Cache.js:97:34\n    at Array.<anonymous> (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/cache/MemoryCachePlugin.js:46:13)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Cache.js:97:19\n    at Hook.eval [as callAsync] (eval at create (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:19:1)\n    at Cache.get (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Cache.js:81:18)\n    at ItemCacheFacade.get (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/CacheFacade.js:116:15)\n    at Compilation._codeGenerationModule (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:3644:9)\n    at codeGen (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5250:11)\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3463:5)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5280:14\n    at processQueue (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/util/processAsyncTree.js:61:4)\n    at processTicksAndRejections (node:internal/process/task_queues:85:11)\n    at runNextTicks (node:internal/process/task_queues:69:3)\n    at process.processImmediate (node:internal/timers:473:9)\n-- inner error --\nError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nExpected expression.\n\u001b[34m   ╷\u001b[0m\n\u001b[34m48 │\u001b[0m             background-image:\u001b[31m\u001b[0m;\n\u001b[34m   │\u001b[0m \u001b[31m                             ^\u001b[0m\n\u001b[34m   ╵\u001b[0m\n  src/block-header/style.scss 48:21  root stylesheet\n    at Object.<anonymous> (/home/jhez03/playstore/plugins/block-playstore/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[4].use[1]!/home/jhez03/playstore/plugins/block-playstore/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[4].use[2]!/home/jhez03/playstore/plugins/block-playstore/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[4].use[3]!/home/jhez03/playstore/plugins/block-playstore/src/block-header/style.scss:1:7)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:518:10\n    at Hook.eval [as call] (eval at create (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:1)\n    at Hook.CALL_DELEGATE [as _call] (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/Hook.js:16:14)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5466:39\n    at tryRunOrWebpackError (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/HookWebpackError.js:81:7)\n    at __webpack_require_module__ (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5464:12)\n    at __webpack_require__ (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5411:18)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5498:20\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3485:9)\n    at done (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3527:9)\n    at Hook.eval [as callAsync] (eval at create (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/Hook.js:20:14)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5386:43\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3463:5)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5348:16\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3485:9)\n    at timesSync (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3463:5)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5316:15\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3485:9)\n    at done (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3527:9)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5262:8\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:3677:6\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/HookWebpackError.js:67:2\n    at Hook.eval [as callAsync] (eval at create (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Cache.store (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Cache.js:113:20)\n    at ItemCacheFacade.store (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/CacheFacade.js:142:15)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:3676:11\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Cache.js:97:34\n    at Array.<anonymous> (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/cache/MemoryCachePlugin.js:46:13)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Cache.js:97:19\n    at Hook.eval [as callAsync] (eval at create (/home/jhez03/playstore/plugins/block-playstore/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:19:1)\n    at Cache.get (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Cache.js:81:18)\n    at ItemCacheFacade.get (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/CacheFacade.js:116:15)\n    at Compilation._codeGenerationModule (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:3644:9)\n    at codeGen (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5250:11)\n    at symbolIterator (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/home/jhez03/playstore/plugins/block-playstore/node_modules/neo-async/async.js:3463:5)\n    at /home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/Compilation.js:5280:14\n    at processQueue (/home/jhez03/playstore/plugins/block-playstore/node_modules/webpack/lib/util/processAsyncTree.js:61:4)\n    at processTicksAndRejections (node:internal/process/task_queues:85:11)\n    at runNextTicks (node:internal/process/task_queues:69:3)\n    at process.processImmediate (node:internal/timers:473:9)\n\nGenerated code for /home/jhez03/playstore/plugins/block-playstore/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[4].use[1]!/home/jhez03/playstore/plugins/block-playstore/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[4].use[2]!/home/jhez03/playstore/plugins/block-playstore/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[4].use[3]!/home/jhez03/playstore/plugins/block-playstore/src/block-header/style.scss\n1 | throw new Error(\"Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\\nExpected expression.\\n\\u001b[34m   ╷\\u001b[0m\\n\\u001b[34m48 │\\u001b[0m             background-image:\\u001b[31m\\u001b[0m;\\n\\u001b[34m   │\\u001b[0m \\u001b[31m                             ^\\u001b[0m\\n\\u001b[34m   ╵\\u001b[0m\\n  src/block-header/style.scss 48:21  root stylesheet\");");

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./src/block-header/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/block-header/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/block-header/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/block-header/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map