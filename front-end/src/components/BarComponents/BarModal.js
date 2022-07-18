import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    TableContainer,
    Button,
    List,
    ListItem,
    Input,
    Divider,
    Select,
    useToast,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BarModal({
    isOpen,
    close,
    reserved,
    reservation,
    id,
    trueId,
    ordered,
}) {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [editing, setEditing] = useState(1);
    const [total, setTotal] = useState(1);
    const [products, setProducts] = useState({});
    const [allProducts, setAllProducts] = useState({});
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(0);
    const toast = useToast();
    var sum = 0;
    useEffect(() => {
        try {
            if (ordered) {
                axios
                    .get("http://localhost:8080/getOrder/" + ordered.idOrder)
                    .then((res) => {
                        const totalDB = res.data;
                        setTotal(totalDB.totalSum);
                    });
            }
        } catch (err) {
            console.error(err.response);
        }
    });

    useEffect(() => {
        try {
            if (ordered) {
                axios.get("http://localhost:8080/getProducts").then((res) => {
                    const totalDB = res.data;
                    setAllProducts(totalDB);
                });
            }
        } catch (err) {
            console.error(err.response);
        }
    });

    function startOrder() {
        try {
            axios.post("http://localhost:8080/addOrder", {
                idTable: trueId,
            });
            window.location.reload();
        } catch (err) {
            console.error(err.response);
        }
    }

    function cancelReservation(id) {
        axios.delete("http://localhost:8080/deleteReservation/" + id);
        window.location.reload();
    }
    function startReservedOrder(id) {
        try {
            axios.delete("http://localhost:8080/deleteReservation/" + id);
            axios.post("http://localhost:8080/addOrder", {
                idTable: trueId,
            });
            window.location.reload();
        } catch (err) {
            console.error(err.response);
        }
    }

    function makeReservation() {
        try {
            if (new Date(date) > new Date()) {
                let data = new Date(date);
                data.setHours(new Date(date).getHours() + 3);
                axios.post("http://localhost:8080/addReservation", {
                    reservationStartTime: data,
                    time: time,
                    idTable: trueId,
                });
                window.location.reload();
            } else {
                toast({
                    title: "Error",
                    description: "Pick a date greater then today!",
                    status: "error",
                    isClosable: true,
                    position: "top-right",
                    duration: 3000,
                });
            }
        } catch (err) {
            console.error(err.response);
        }
    }

    function incrementQuantity(product, idProduct, idOrder, productQuantity) {
        productQuantity++;
        setEditing(editing + 1);
        if (product.Product.totalQuantity > 0) {
            try {
                axios
                    .put("http://localhost:8080/modifyBill", {
                        idProduct,
                        idOrder,
                        productQuantity,
                    })
                    .then(
                        axios.put(
                            "http://localhost:8080/modifyQuantity/" + idProduct,
                            {
                                quantity: 1,
                                sign: 0,
                            }
                        )
                    );
            } catch (err) {
                console.error(err.response);
            }
        } else {
            toast({
                title: "Error",
                description:
                    "There are only " +
                    product.Product.totalQuantity +
                    " products available",
                status: "error",
                isClosable: true,
                position: "top-right",
                duration: 3000,
            });
        }
    }

    function finish() {
        axios.delete("http://localhost:8080/deleteBills/" + ordered.idOrder);
        axios.delete("http://localhost:8080/deleteOrder/" + ordered.idOrder);
        window.location.reload();
    }

    function addProduct() {
        let product = Array.from(allProducts).find(
            (prod) => prod.productName === productName
        );
        if (quantity <= product.totalQuantity) {
            try {
                axios
                    .post("http://localhost:8080/addBill", {
                        productQuantity: quantity,
                        ProductIdProduct: product.idProduct,
                        OrderIdOrder: ordered.idOrder,
                    })
                    .then(
                        axios.put(
                            "http://localhost:8080/modifyQuantity/" +
                                product.idProduct,
                            { quantity: quantity, sign: 0 }
                        )
                    );

                setEditing(editing + 1);
            } catch (err) {
                console.error(err.response);
            }
        } else {
            toast({
                title: "Error",
                description:
                    "There are only " +
                    product.totalQuantity +
                    " products available",
                status: "error",
                isClosable: true,
                position: "top-right",
                duration: 3000,
            });
        }
    }
    function decrementQuantity(idProduct, idOrder, productQuantity) {
        productQuantity--;
        setEditing(editing - 1);
        if (productQuantity > 0) {
            try {
                axios
                    .put("http://localhost:8080/modifyBill", {
                        idProduct,
                        idOrder,
                        productQuantity,
                    })
                    .then(
                        axios.put(
                            "http://localhost:8080/modifyQuantity/" + idProduct,
                            {
                                quantity: 1,
                                sign: 1,
                            }
                        )
                    );
            } catch (err) {
                console.error(err.response);
            }
        } else {
            try {
                axios
                    .delete(
                        "http://localhost:8080/deleteBill/" +
                            idOrder +
                            "/" +
                            idProduct
                    )
                    .then(
                        axios.put(
                            "http://localhost:8080/modifyQuantity/" + idProduct,
                            {
                                quantity: 1,
                                sign: 1,
                            }
                        )
                    );
            } catch (err) {
                console.error(err.response);
            }
        }
        axios.put("http://localhost:8080/setPrice/" + ordered.idOrder);
    }

    useEffect(() => {
        try {
            if (ordered) {
                axios
                    .get(
                        "http://localhost:8080/getProductsForOrder/" +
                            ordered.idOrder
                    )
                    .then((res) => {
                        const productsDB = res.data;
                        setProducts(productsDB);
                    });
            }
        } catch (err) {
            console.error(err.response);
        }
    }, [ordered, editing]);

    useEffect(() => {
        try {
            if (ordered) {
                axios
                    .get(
                        "http://localhost:8080/getProductsForOrder/" +
                            ordered.idOrder
                    )
                    .then((res) => {
                        const productsDB = res.data;
                        setProducts(productsDB);
                    });
            }
        } catch (err) {
            console.error(err.response);
        }
    }, [ordered, editing]);

    Array.from(products).map(
        (product) => (sum += product.Product.price * product.productQuantity)
    );

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={close}
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>{"Masa " + id}</ModalHeader>
                <ModalCloseButton />
                <div className="Modal">
                    <ModalBody pb={6}>
                        {ordered ? (
                            <div>
                                <TableContainer>
                                    <List>
                                        {Array.from(products).map((product) => {
                                            return (
                                                <ListItem
                                                    key={
                                                        product.Product
                                                            .idProduct
                                                    }
                                                >
                                                    {
                                                        product.Product
                                                            .productName
                                                    }{" "}
                                                    Price:{" "}
                                                    {product.Product.price}
                                                    {" RON "}
                                                    Quantity:{" "}
                                                    {
                                                        product.productQuantity
                                                    }{" "}
                                                    {"   "}
                                                    <Button
                                                        onClick={() =>
                                                            decrementQuantity(
                                                                product.ProductIdProduct,
                                                                product.OrderIdOrder,
                                                                product.productQuantity
                                                            )
                                                        }
                                                        size="sm"
                                                        variant="ghost"
                                                    >
                                                        <MinusIcon></MinusIcon>
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            incrementQuantity(
                                                                product,
                                                                product.ProductIdProduct,
                                                                product.OrderIdOrder,
                                                                product.productQuantity
                                                            )
                                                        }
                                                        size="sm"
                                                        variant="ghost"
                                                    >
                                                        <AddIcon></AddIcon>
                                                    </Button>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </TableContainer>
                                <div>Suma este de {sum} RON</div>

                                <div>
                                    <form noValidate>
                                        <Select
                                            onChange={(valueString) => {
                                                setProductName(
                                                    valueString.currentTarget
                                                        .value
                                                );
                                            }}
                                        >
                                            {Array.from(allProducts).map(
                                                (lay) => (
                                                    <option
                                                        key={lay.idProduct}
                                                        value={lay.productName}
                                                    >
                                                        {lay.productName}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                        <Input
                                            type="number"
                                            placeholder="Quantity"
                                            onChange={(valueString) => {
                                                setQuantity(
                                                    valueString.currentTarget
                                                        .value
                                                );
                                            }}
                                        />
                                    </form>

                                    <Button
                                        colorScheme="facebook"
                                        onClick={() => addProduct()}
                                    >
                                        Add Product
                                    </Button>
                                    <Button
                                        colorScheme="facebook"
                                        onClick={() => finish()}
                                    >
                                        Finish Bill
                                    </Button>

                                    {/* <Button variant="ghost">
                                        <InfoOutlineIcon></InfoOutlineIcon>
                                    </Button> */}
                                </div>
                            </div>
                        ) : Array.from(reserved).length ? (
                            <div>
                                Pentru aceasta masa s-a facut o rezervare pentru
                                ora:{" "}
                                {new Date(
                                    reservation.reservationStartTime
                                ).getHours() -
                                    3 +
                                    ":" +
                                    new Date(
                                        reservation.reservationStartTime
                                    ).getMinutes()}
                                <div>
                                    <Button
                                        colorScheme={"facebook"}
                                        variant="ghost"
                                        onClick={() =>
                                            cancelReservation(
                                                reservation.idReservation
                                            )
                                        }
                                    >
                                        Cancel Reservation
                                    </Button>
                                    <Button
                                        colorScheme={"facebook"}
                                        variant="ghost"
                                        onClick={() =>
                                            startReservedOrder(
                                                reservation.idReservation
                                            )
                                        }
                                    >
                                        Start Order
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="FreeTable">
                                This table is free!
                                <form className="form" noValidate>
                                    Add Reservation
                                    <Input
                                        type="datetime-local"
                                        onChange={(valueString) => {
                                            setDate(
                                                valueString.currentTarget.value
                                            );
                                        }}
                                    ></Input>
                                    <Divider orientation="vertical"></Divider>
                                    <Input
                                        type="number"
                                        placeholder="Number Of Hours"
                                        onChange={(valueString) => {
                                            setTime(
                                                valueString.currentTarget.value
                                            );
                                        }}
                                    ></Input>
                                </form>
                                <div>
                                    <Button
                                        colorScheme={"facebook"}
                                        variant="ghost"
                                        onClick={() => makeReservation()}
                                    >
                                        Add Reservation
                                    </Button>
                                    <Button
                                        colorScheme={"facebook"}
                                        variant="ghost"
                                        onClick={() => startOrder()}
                                    >
                                        Start Order
                                    </Button>
                                </div>
                            </div>
                        )}
                    </ModalBody>
                </div>
            </ModalContent>
        </Modal>
    );
}
