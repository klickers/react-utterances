"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.identifierTypes = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var validTypeList = ['pathname', 'url', 'title', 'og:title', 'issue-number', 'issue-term'];

var getAttrName = function getAttrName(type) {
  if (validTypeList.indexOf(type) < 0) {
    console.warn('Wrong type: ' + type);
    return;
  }

  return type === 'issue-number' ? 'issue-number' : 'issue-term';
};

var getAttrValue = function getAttrValue(type, specificTerm, issueNumber) {
  if (validTypeList.indexOf(type) < 0) {
    console.warn('Wrong type: ' + type);
    return;
  }

  if (type === 'pathname') {
    return 'pathname';
  } else if (type === 'url') {
    return 'url';
  } else if (type === 'title') {
    return 'title';
  } else if (type === 'og:title') {
    return 'og:title';
  } else if (type === 'issue-term') {
    return specificTerm;
  } else if (type === 'issue-number') {
    return issueNumber;
  }
};

var ReactUtterences =
/*#__PURE__*/
function (_Component) {
  _inherits(ReactUtterences, _Component);

  function ReactUtterences(props) {
    var _this;

    _classCallCheck(this, ReactUtterences);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactUtterences).call(this, props));
    _this.myRef = _react.default.createRef();
    _this.state = {
      pending: true
    };
    return _this;
  }

  _createClass(ReactUtterences, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          repo = _this$props.repo,
          type = _this$props.type,
          theme = _this$props.theme,
          specificTerm = _this$props.specificTerm,
          issueNumber = _this$props.issueNumber;
      var attrName = getAttrName(type);
      var value = getAttrValue(type, specificTerm, issueNumber);

      if (type === 'issue-term' && !value) {
        console.warn("When type is '".concat(type, "', 'specificTerm' prop must be provided"));
        return;
      } else if (type === 'issue-number' && (isNaN(value) || value < 1)) {
        console.warn("When type is '".concat(type, "', valid 'issueNumber' prop must be provided"));
        return;
      }

      var scriptEl = document.createElement('script');
      scriptEl.src = 'https://utteranc.es/client.js';
      scriptEl.async = true;
      scriptEl.setAttribute('repo', repo);
      scriptEl.setAttribute('theme', theme);
      scriptEl.setAttribute('crossorigin', 'anonymous');
      scriptEl.setAttribute(attrName, value);

      scriptEl.onload = function () {
        return _this2.setState({
          pending: false
        });
      };

      this.myRef.current.appendChild(scriptEl);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "react-utterences",
        ref: this.myRef
      }, this.props.debug && _react.default.createElement("pre", {
        style: {
          background: '#ccccccc',
          padding: 10
        }
      }, "\nthis.props: ".concat(JSON.stringify(this.props, null, 2), "\nlocation.pathname: \"").concat(window.location.pathname, "\"\nlocation.href: \"").concat(window.location.href, "\"\n          ").trim()), this.props.debug && _react.default.createElement("div", null, "\uD83D\uDC47\uD83D\uDC47If the settings are valid, the comment widget appear below\uD83D\uDC47\uD83D\uDC47"), this.state.pending && _react.default.createElement("div", null, "Loading script..."));
    }
  }]);

  return ReactUtterences;
}(_react.Component);

var identifierTypes = {
  'pathname': {
    attrValue: '',
    summary: 'Issue title contains page pathname'
  },
  'url': {
    attrValue: 'url',
    summary: 'Issue title contains page URL'
  },
  'title': {
    attrValue: 'title',
    summary: 'Issue title contains page title'
  },
  'og:title': {
    attrValue: 'og:title',
    summary: 'Issue title contains page og:title'
  },
  'issue-number': {
    attrValue: -1,
    summary: 'Specific issue number'
  },
  'issue-term': {
    attrValue: '',
    summary: 'Issue title contains specific term'
  }
};
exports.identifierTypes = identifierTypes;
ReactUtterences.propTypes = {
  type: _propTypes.default.string.isRequired,
  repo: _propTypes.default.string.isRequired,
  theme: _propTypes.default.string.isRequired,
  specificTerm: _propTypes.default.string,
  issueNumber: _propTypes.default.number,
  hashKey: _propTypes.default.string,
  debug: _propTypes.default.bool
};
var _default = ReactUtterences;
exports.default = _default;
