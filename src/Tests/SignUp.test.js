import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button } from "@material-ui/core";
import SignUp from "../Components/pages/SignUp";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Sign Up", () => {
  let wrapper;
  let button;
  beforeEach(() => {
    wrapper = shallow(<SignUp />);
    button = wrapper.find(Button);
  });

  it("when proper email,name and password should be valid", () => {
    wrapper.setState({
      firstName: "Bhavesh",
      lastName: "Kadam",
      email: "bhavesh357357@gmail.com",
      firstPassword: "Testing@357",
      secondPassword: "Testing@357",
    });
    button.simulate("click");
    expect(wrapper.state("isEmailInvalid")).toBe(false);
    expect(wrapper.state("isFirstPasswordInvalid")).toBe(false);
    expect(wrapper.state("isSecondPasswordInvalid")).toBe(false);
    expect(wrapper.state("isFirstNameInvalid")).toBe(false);
    expect(wrapper.state("isLastNameInvalid")).toBe(false);
  });

  it("when improper names should be invalid", () => {
    wrapper.setState({
        firstName: "bhavesh",
        lastName: "kadam",
      });
    button.simulate("click");
    expect(wrapper.state("isFirstNameInvalid")).toBe(true);
    expect(wrapper.state("isLastNameInvalid")).toBe(true);
  });

  it("when improper passwords should be invalid", () => {
    wrapper.setState({
        firstPassword: "Testing",
      });
    button.simulate("click");
    expect(wrapper.state("isFirstPasswordInvalid")).toBe(true);
  });

  it("when improper email should be invalid", () => {
    wrapper.setState({
        email: "bhavesh!33.hea",
      });
    button.simulate("click");
    expect(wrapper.state("isEmailInvalid")).toBe(true);
  });
});
