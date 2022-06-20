import React, { Component } from "react";
import { Wrap, WrapItem, Image } from "@chakra-ui/react";
import "./Gallery.css";
import NavBarMain from "../NavBarMain/NavBarMain";

function Gallery() {
    var lista = [];
    for (var i = 0; i < 10; i++) {
        lista.push(1);
    }
    var string = "https://bit.ly/dan-abramov";
    return (
        <div className="Gallery">
            <NavBarMain />
            <div className="images">
                <Wrap>
                    {lista.map((item) => (
                        <WrapItem>
                            <div className="imagine">
                                <Image size="sm" src={string} />
                            </div>
                        </WrapItem>
                    ))}
                </Wrap>
            </div>
        </div>
    );
}

export default Gallery;
