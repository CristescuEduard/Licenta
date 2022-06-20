import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput,
    NumberInputField,
    Select,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
export default function CustomModal({ subCategory, isOpen, close, product }) {
    const OverlayOne = () => (
        <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />
    );

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const overlay = <OverlayOne />;

    var price = product ? product.price : 0;
    var category = product ? product.category : "Bar";
    var type = product ? product.subCategory : "desert";
    var productDescription = product ? product.productDescription : "a";
    var productName = product ? product.productName : "a";
    var totalQuantity = product ? product.totalQuantity : 0;
    var idProduct = product ? product.idProduct : 0;

    const modifyProducts = async (e) => {
        var subCategory = type;
        axios.put("http://localhost:8080/modifyProduct", {
            idProduct,
            productName,
            category,
            subCategory,
            price,
            totalQuantity,
            productDescription,
        });
        window.location.reload(false);
    };

    const addProducts = async (e) => {
        var subCategory = type;
        console.log(
            productName,
            category,
            subCategory,
            totalQuantity,
            price,
            productDescription
        );
        axios.post("http://localhost:8080/addProduct", {
            productName,
            category,
            subCategory,
            totalQuantity,
            price,
            productDescription,
        });
        window.location.reload(false);
    };

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={close}
        >
            {overlay}
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {product ? "Edit Product" : "Add Product"}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Product Name</FormLabel>
                        <Input
                            defaultValue={product ? product.productName : ""}
                            placeholder="Product Name"
                            onChange={(valueString) => {
                                productName = valueString.currentTarget.value;
                            }}
                        ></Input>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Product Category</FormLabel>
                        <Select
                            defaultValue={product ? product.category : ""}
                            onChange={(valueString) => {
                                category = valueString.currentTarget.value;
                            }}
                        >
                            <option value="Bar">Bar</option>
                            <option value="Kitchen">Kitchen</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Product Type</FormLabel>
                        <Select
                            defaultValue={product ? product.subCategory : ""}
                            onChange={(valueString) => {
                                type = valueString.currentTarget.value;
                            }}
                        >
                            {Array.from(subCategory).map((lay) => (
                                <option
                                    key={Array.from(subCategory).indexOf(lay)}
                                    value={lay}
                                >
                                    {lay}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Product Price</FormLabel>
                        <NumberInput
                            defaultValue={product ? product.price : 0}
                            onChange={(valueString) => {
                                price = parseInt(valueString);
                            }}
                        >
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Product Qunatity</FormLabel>
                        <NumberInput
                            defaultValue={product ? product.totalQuantity : 0}
                            onChange={(valueString) => {
                                totalQuantity = parseInt(valueString);
                            }}
                        >
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Product Description</FormLabel>
                        <Input
                            defaultValue={
                                product ? product.productDescription : ""
                            }
                            placeholder="Product Description"
                            onChange={(valueString) => {
                                productDescription =
                                    valueString.currentTarget.value;
                            }}
                        ></Input>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    {product ? (
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={modifyProducts}
                        >
                            Modify
                        </Button>
                    ) : (
                        <Button colorScheme="blue" mr={3} onClick={addProducts}>
                            Save
                        </Button>
                    )}
                    <Button onClick={close}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
