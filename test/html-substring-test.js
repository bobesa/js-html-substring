//Test dependencies
var assert = require('assert');
    
//Import html-substring functionality
require("../html-substring.js");

describe('html-substring', function(){
    
    describe('content is longer than max length', function(){
        it('should return same text we entered', function(){
            assert.equal(
                "short <b>text</b>".html_substr(999999),
                "short <b>text</b>"
            );
        });
    });
    
    describe('max length cuts content inside of tag', function(){
        it('should close open tag', function(){
            assert.equal(
                "short <b>text</b> etc".html_substr(8,""),
                "short <b>te</b>"
            );
        });
    });    
    
    describe('we have multiple nested tags', function(){
        it('should close all open tags', function(){
            assert.equal(
                "short <span>text that <b>is important</b> maybe</span>".html_substr(18,""),
                "short <span>text that <b>is</b></span>"
        	);
        });
    }); 
    
    describe('incomplete tags (wrong html)', function(){
        it('should return what was found before', function(){
            assert.equal(
                "short <span text that".html_substr(10,""),
                "short "
        	);
        });
    }); 
    
    describe('multiple tags inside', function(){
        it('should return as many tags until content length is enough', function(){
            assert.equal(
                "short <ul><li>aaa</li><li>bbb</li><li>ccc</li></ul>".html_substr(10,""),
                "short <ul><li>aaa</li><li>b</li></ul>"
        	);
        });
    });  
    
    describe('tags with arguments', function(){
        it('should copy tags with arguments as is', function(){
            assert.equal(
                "short <span style=\"color: #F00\">text</span> etc".html_substr(8),
                "short <span style=\"color: #F00\">te</span>..."
            );
        });
    }); 
    
    describe('we want default suffix', function(){
        it('should append "..."', function(){
            assert.equal(
                "short <span>text</span>".html_substr(5),
                "short..."
        	);
        });
    });
    
    describe('we want no suffix', function(){
        it('should append no suffix', function(){
            assert.equal(
                "short <span>text</span>".html_substr(5,false),
                "short"
        	);
        });
    });
    
    describe('we want custom suffix', function(){
        it('should append custom suffix', function(){
            assert.equal(
                "short <span>text</span>".html_substr(5,"?"),
                "short?"
        	);
        });
    });
    
});