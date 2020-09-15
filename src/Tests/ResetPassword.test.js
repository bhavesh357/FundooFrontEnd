import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button } from "@material-ui/core";
import ResetPassword from './../Components/pages/ResetPassword'

Enzyme.configure({
  adapter: new Adapter(),
});

describe("Sign Up", () => {
  let wrapper;
  let button;
  beforeEach((props) => {
    wrapper = shallow(<ResetPassword {...props}/>);
    button = wrapper.find(Button);
    wrapper.setProps({
      match:{
          params: {
              token: 'IpwHqa3QRDMUo9D0w6MXGz4AEkH35pUBNpDGiVJiBxGJ64NrafLrPSBom4KYtc4b',
          }
      }
  })
  });

  it("when proper email should be valid", () => {
    wrapper.setState({
        firstPassword: "Resting@357",
        secondPassword: "Resting@357",
      });
    button.simulate("click");
    expect(wrapper.state("isFirstPasswordInvalid")).toBe(false);
    expect(wrapper.state("isSecondPasswordinvalid")).toBe(false);
  });

  it("when improper email should be invalid", () => {
    wrapper.setState({
        firstPassword: "bhavesh!33.hea",
        secondPassword: "bhavesh!33.hea",
      });
    button.simulate("click");
    expect(wrapper.state("isFirstPasswordInvalid")).toBe(true);
    expect(wrapper.state("isSecondPasswordinvalid")).toBe(true);
  });
});
