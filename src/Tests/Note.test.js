import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button, Card } from "@material-ui/core";
import Note from "./../Components/Note";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Sign Up", () => {
  let wrapper;
  let card;
  let note = {
    title: "hjbjba",
    description: "kjbkjbka",
    isPined: false,
    isArchived: false,
    isDeleted: false,
    reminder: [],
    createdDate: "2020-09-11T11:34:39.778Z",
    modifiedDate: "2020-09-11T11:34:39.778Z",
    color: "#ffffff",
    label: [],
    imageUrl: "client/images/1599208896416.png",
    linkUrl: "",
    collaborators: [],
    id: "5f5b60cf6217e60022cd3abf",
    userId: "5f5b5c0a6217e60022cd3abb",
    collaberator: [],
    labelIdList: [],
    noteCheckLists: [],
    noteLabels: [
      {
        label: "a",
        isDeleted: true,
        id: "5f5bc7556217e60022cd3ae3",
        userId: "5f5b5c0a6217e60022cd3abb",
      },
      {
        label: "c",
        isDeleted: false,
        id: "5f5d25366217e60022cd3b54",
        userId: "5f5b5c0a6217e60022cd3abb",
      },
    ],
    questionAndAnswerNotes: [],
    user: {
      firstName: "Bhavesh",
      lastName: "Kadam",
      role: "user",
      service: "advance",
      createdDate: "2020-09-11T11:14:16.941Z",
      modifiedDate: "2020-09-11T11:14:16.941Z",
      username: "bhavesh357357@gmail.com",
      email: "bhavesh357357@gmail.com",
      emailVerified: true,
      id: "5f5b5c0a6217e60022cd3abb",
    },
  };
  beforeEach(() => {
    wrapper = shallow(<Note note={note}/>);
    card = wrapper.find('.card-title');
  });

  it("when editing should be opened", () => {
      console.log(card.debug());
    card.at(0).simulate("click");
    expect(wrapper.state("isEditing")).toBe(true);
  });
});
