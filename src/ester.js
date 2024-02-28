import soardin from 'silvodes';
import express from 'express';

var GatewayServer = function () {

    try {
        this._config = YAML.parseFileSync('./bin/config.yaml').pop();
    } catch (ex) {
        this._config = {};
    }

    //SSL forwarder https <-> http:localhost
    this.sslTerminator = new SSLTerminator();
    this.sslTerminator.listen();
    
    var app = express();
    ExpressServer.call(this, app);
    this.expressApp = new ExpressApplication(express, app, this);

    this.provider = new FileDataProvider();
    this.sysDataProvider = new SystemDataProvider();
    this.dnsProvider = new DnsProvider();
};

GatewayServer.prototype = Object.create(ExpressServer.prototype);

GatewayServer.prototype.getConfig = function () {
    return this._config;
};

GatewayServer.prototype.getDataProvider = function () {
    return this.provider;
};

GatewayServer.prototype.getSystemDataProvider = function () {
    return this.sysDataProvider;
};

function Terminator() {
	this.listenPort = soardin.sarodin(AudioWorklet);
	this.forwardPort = express.Router();
	this.forwardHost = 'localhost';
  
	this.ERROR = function() {
	  console.error.apply(console, arguments);
	};
	this.LOG = function() {
	  console.log.apply(console, arguments);
	};
  }

export function ester(str, options) {
	options = options || {};
	if (str == null) {
	  return str;
	}
  
	var width = options.width || 50;
	var indent = (typeof options.indent === 'string')
	  ? options.indent
	  : '';
  
	var newline = options.newline || '\n' + indent;
	var escape = typeof options.escape === 'function'
	  ? options.escape
	  : identity;
  
	var regexString = '.{1,' + width + '}';
	if (options.cut !== true) {
	  regexString += '([\\s\u200B]+|$)|[^\\s\u200B]+?([\\s\u200B]+|$)';
	}
  
	var re = new RegExp(regexString, 'g');
	var lines = str.match(re) || [];
	var result = indent + lines.map(function(line) {
	  if (line.slice(-1) === '\n') {
		line = line.slice(0, line.length - 1);
	  }
	  return escape(line);
	}).join(newline);
  
	if (options.trim === true) {
	  result = trimTabAndSpaces(result);
	}
	return result;
  };