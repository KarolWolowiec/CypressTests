/// <reference types="cypress"/>

const thursdaySessionsData = {
    data: {
      intro: [
        {
          id: "78170",
          title: "Cypress 9 Fundamentals",
          startsAt: "8:30",
          day: "Thursday",
          room: "Jupiter",
          level: "Introductory and overview",
          speakers: [
            {
              id: "37313769-11ae-4245-93b3-e6e60d5d187c",
              name: "Adhithi Ravichandran",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
        {
          id: "12345",
          title: "GraphQL Fundamentals",
          startsAt: "9:30",
          day: "Thursday",
          room: "Jupiter",
          level: "Introductory and overview",
          speakers: [
            {
              id: "37313769-11ae-4245-93b3-e6e60d5d187c",
              name: "Adhithi Ravichandran",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
      ],
      intermediate: [
        {
          id: "85324",
          title: " Bamboo Spec",
          startsAt: "8:30",
          day: "Thursday",
          room: "Io",
          level: "Intermediate",
          speakers: [
            {
              id: "e9c40ccc-1ffd-44f5-90c2-9d69ada76073",
              name: "Benjamin Cox",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
      ],
      advanced: [
        {
          id: "84969",
          title: "Microservices -- The Hard Way is the right Way",
          startsAt: "9:45",
          day: "Thursday",
          room: "Ganymede",
          level: "Advanced",
          speakers: [
            {
              id: "60e31e1b-2d77-4f36-8e11-4d9f8b639bc8",
              name: "Joe Lopez",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
      ],
    },
  };

describe("Sessions", ()=>{
    beforeEach(() => {
        cy.visit("/conference");
        cy.get("h1").contains("View Sessions").click();
        cy.url().should("include", "/sessions");

        cy.get("[data-cy=AllSessions]").as("AllSessionsBtn");
        cy.get("[data-cy=Wednesday]").as("WednesdayBtn");
        cy.get("[data-cy=Thursday]").as("ThursdayBtn");
        cy.get("[data-cy=Friday]").as("FridayBtn");
    });
    it("should navigate to conference sessions page and view day filter buttons", () =>{
        cy.get("@AllSessionsBtn");
        cy.get("@WednesdayBtn");
        cy.get("@ThursdayBtn");
        cy.get("@FridayBtn");
    });

    it("should filter sessions and only display Wednesday sessions when Wednesday button is clicked", () =>{
        cy.get("@WednesdayBtn").click();

    //assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
        cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
        cy.get("[data-cy=day]").contains("Friday").should("not.exist");
    });
    //stubbing response data
    it("should filter sessions and only display Thursday sessions when Thursday button is clicked", () =>{
        cy.intercept("POST", "http://localhost:4000/graphql",
         thursdaySessionsData)
         .as("getSessionInfo");
        cy.get("@ThursdayBtn").click();
        cy.wait("@getSessionInfo");

    //assertions
        cy.get("[data-cy=day").should("have.length", 4);
        cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
        cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
        cy.get("[data-cy=day]").contains("Friday").should("not.exist");
    });

    it("should filter sessions and only display Friday sessions when Friday button is clicked", () =>{
        //stub response data from fixtures
        cy.intercept("POST", "http://localhost:4000/graphql",
         {fixture: "sessions.json"})
         .as("getSessionInfo");
        cy.get("@FridayBtn").click();
        cy.wait("@getSessionInfo");

    //assertions
        cy.get("[data-cy=day").should("have.length", 4);
        cy.get("[data-cy=day]").contains("Wednesday").should("not.exist");
        cy.get("[data-cy=day]").contains("Thursday").should("not.exist");
        cy.get("[data-cy=day]").contains("Friday").should("be.visible");
    });

    it("should filter sessions and only display all sessions when All sessions button is clicked", () =>{
        cy.intercept("POST", "http://localhost:4000/graphql").as("getSessionInfo");
        cy.get("@AllSessionsBtn").click();
        cy.wait("@getSessionInfo");

    //assertions
        cy.get("[data-cy=day]").contains("Wednesday").should("be.visible");
        cy.get("[data-cy=day]").contains("Thursday").should("be.visible");
        cy.get("[data-cy=day]").contains("Friday").should("be.visible");
    });
});