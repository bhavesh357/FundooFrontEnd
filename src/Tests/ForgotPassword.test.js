import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button } from "@material-ui/core";
import ForgotPassword from './../Components/pages/ForgotPassword'

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Sign Up", () => {
  let wrapper;
  let button;
  beforeEach(() => {
    wrapper = shallow(<ForgotPassword />);
    button = wrapper.find(Button);
  });

  it("when proper email should be valid", () => {
    wrapper.setState({
        email: "Bhavesh357@gmail.com",
      });
    button.simulate("click");
    expect(wrapper.state("isEmailInvalid")).toBe(false);
  });

  it("when improper email should be invalid", () => {
    wrapper.setState({
        email: "bhavesh!33.hea",
      });
    button.simulate("click");
    expect(wrapper.state("isEmailInvalid")).toBe(true);
  });
});
