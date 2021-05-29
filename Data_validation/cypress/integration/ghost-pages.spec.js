/// <reference types="cypress" />

import { Login } from "../page-objects/login"
import {Page} from "../page-objects/page";
import * as faker from "faker";

const login = new Login()
const page = new Page()

var pageData = require('../external-data/pages-data.js')

Object.keys(pageData).forEach(str => {

    pageData[str].forEach(data => {
        if(str === 'apriori-positive' ||
            str === 'random-positive') {
            context('Pages positive', () => {

                beforeEach(() => {
                    login.login(true)
                    page.goToPagesSection()
                })
                it('Add and edit page', () => {
                    page.addEditPage(
                        (str === 'random-positive') ? data.title() : data.title,
                        (str === 'random-positive') ? data.paragraph() : data.paragraph
                    )
                })
            })
        }else if(str === 'apriori-negative' ||
            str === 'random-negative') {
            context('Pages negative', () => {

                beforeEach(()=>{
                    login.login(true)
                    page.goToPagesSection()
                })
                it('Add and edit page and check error', () => {
                    page.addEditPageError(
                        (str === 'random-negative') ? data.title() : data.title,
                        (str === 'random-negative') ? data.paragraph() : data.paragraph
                    )
                })

            })
        }

    })
})





