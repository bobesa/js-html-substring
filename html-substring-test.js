//Test dependencies
var vows = require("vows"),
    assert = require('assert');
    
//Import html-substring functionality
require("./html-substring.js");

//Prepare test suite
vows.describe('html-substring').addBatch({
    
    'content is longer than max length': {
        topic: function(){
            return "short <b>text</b>".html_substr(999999);
        },
        'should return same text we entered': function(topic){
            assert.equal(topic, "short <b>text</b>");
        }
    },
    
    'max length cuts content inside of tag': {
        topic: function(){
            return "short <b>text</b> etc".html_substr(8,"");
        },
        'should close open tag': function(topic){
            assert.equal(topic, "short <b>te</b>");            
        }
    },
    
    'we have multiple nested tags': {
        topic: function(){
            return "short <span>text that <b>is important</b> maybe</span>".html_substr(18,"");
        },
        'should close all open tags': function(topic){
            assert.equal(topic, "short <span>text that <b>is</b></span>");            
        }
    },    
    
    'we want default suffix': {
        topic: function(){
            return "short <span>text</span>".html_substr(5);
        },
        'should append "..."': function(topic){
            assert.equal(topic, "short...");            
        }
    },
    
    'we want no suffix': {
        topic: function(){
            return "short <span>text</span>".html_substr(5,false);
        },
        'should append custom suffix': function(topic){
            assert.equal(topic, "short");            
        }
    },
    
    'we want custom suffix': {
        topic: function(){
            return "short <span>text</span>".html_substr(5,"?");
        },
        'should append custom suffix': function(topic){
            assert.equal(topic, "short?");            
        }
    }
    
}).export(module);