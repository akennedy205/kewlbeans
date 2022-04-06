
/**
 * @jest-environment jsdom
 */
const { expect } = require("@jest/globals");
const fs = require('fs');
const path = require('path');
const { isTypedArray } = require("util/types");
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

//Running preliminary tests on the homepage elemets

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
    //Practice test here
    test('practice test: The title in the head says Latte.io', () => {
        let title = document.querySelector('title');
        expect(title.textContent).toContain('Latte.io');
    })
    
    
    describe("body", () => {
        describe('nav', () => {
            let nav;

            beforeEach(() => {
                nav = document.querySelector("nav");
            })

            it ("exists and has 3 buttons", () => {
                expect(nav).toBeTruthy();
                expect(nav.children.length).toEqual(3);
            })

        })
    })

        test('it has a body', () => {
            let body = document.querySelector('body');
            expect(body).toBeTruthy();
        })

        test('it has a Div', () => {
            let div = document.querySelector('button');
            expect(div).toBeTruthy();
        })

        test("Each navigation button has a link", () => {
            let navItems = document.querySelectorAll("ul.navbar-nav li.nav-item:not(.active) a")
            expect(navItems).toHaveLength(2);
            
            })

    //Testing the hyperlinks from homepage to Post and Review pages
    

    /*test('should navigate to ./posts.html when the button is clicked', () => {
        expect(document.getByText('New Post').closest('a')).toHaveAttribute('href','./posts.html');
        
    });*/
    



})

