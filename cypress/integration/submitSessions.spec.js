/// <reference types="cypress"/>

describe("Submit session", ()=>{
    beforeEach(() =>{
        cy.visit("/conference");
        cy.get("h1").contains("View Sessions").click();
        cy.url().should("include", "/sessions");
        cy.get("a").contains("Submit a Session!").click();
    })
    it("should navigate to submit sessions page", () =>{
        cy.url().should("include", "/sessions/new");
    });

    it("should submit a session successfully", () =>{
        cy.contains("Title").type("New session title");
        cy.contains("Description").type("test session");
        cy.contains("Day").type("Thursday");
        cy.contains("Level").type("Advanced");

        cy.get("form").submit();

        cy.contains("Session Submitted Successfully");
    });
});