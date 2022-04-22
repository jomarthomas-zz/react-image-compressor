import React from "react";
import imageCompression from "browser-image-compression";
import Card from "react-bootstrap/Card";
import { Navbar, Button } from "react-bootstrap";

export default class imageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false
    };
  }

  handle = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    });
  };

  changeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = e => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <>
        <Navbar bg="light" variant="light" className="shadow p-3 mb-5 bg-body">
          <Navbar.Brand>
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginRight: "0.5rem" }}
            />
            <span>Image Compressor</span>
          </Navbar.Brand>
        </Navbar>

        <div className="m-5 p-5">
          <div className="row" style={{ alignItems: "baseline" }}>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              {this.state.uploadImage ? (
                <Card.Img
                  className="ht shadow-lg mb-5"
                  variant="top"
                  src={this.state.originalLink}
                ></Card.Img>
              ) : (
                <Card.Img
                  className="ht shadow-lg mb-5"
                  variant="top"
                  src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
                ></Card.Img>
              )}
              <div className="d-flex justify-content-center">
                <div className="input-group mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    id="inputGroupFile02"
                    onChange={e => this.handle(e)}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
              {/* <div className="d-flex justify-content-center align-items-baseline"> */}
              <br />
              {this.state.outputFileName ? (
                <>
                  <Button type="button" size="lg" onClick={e => this.click(e)}>
                    Compress Image
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
              <Card.Img
                variant="top"
                className="shadow-lg mb-5"
                src={this.state.compressedLink}
              ></Card.Img>
              {this.state.clicked ? (
                <div className="d-flex justify-content-center">
                  <a
                    href={this.state.compressedLink}
                    download={this.state.outputFileName}
                    className="mt-2 btn btn-dark w-75"
                  >
                    Download
                  </a>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
