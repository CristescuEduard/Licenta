import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    TableContainer,
    Checkbox,
    List,
    ListItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
export default function BarModal({
    table,
    isOpen,
    close,
    reserved,
    reservation,
    id,
    ordered,
}) {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [products, setProducts] = useState({});

    const classes = useStyles();
    function incrementQuantity(idProduct, idOrder, productQuantity) {
        productQuantity++;
        try {
            axios.put("http://localhost:8080/modifyBill", {
                idProduct,
                idOrder,
                productQuantity,
            });
        } catch (err) {
            console.error(err.response);
        }
    }
    function decrementQuantity(idProduct, idOrder, productQuantity) {
        productQuantity--;
        try {
            axios.put("http://localhost:8080/modifyBill", {
                idProduct,
                idOrder,
                productQuantity,
            });
        } catch (err) {
            console.error(err.response);
        }
    }

    useEffect(() => {
        try {
            if (ordered) {
                var orderId = ordered.idOrder;
                axios
                    .get(
                        "http://localhost:8080/getProductsForOrder/" +
                            ordered.idOrder
                    )
                    .then((res) => {
                        const productsDB = res.data;
                        console.log(productsDB);
                        setProducts(productsDB);
                    });
                axios.put("http://localhost:8080/setPrice/" + orderId);
            }
        } catch (err) {
            console.error(err.response);
        }
    }, [ordered]);

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
                <ModalBody pb={6}>
                    {ordered ? (
                        <div>
                            <TableContainer>
                                <List>
                                    {Array.from(products).map((product) => {
                                        return (
                                            <ListItem
                                                key={product.Product.idProduct}
                                            >
                                                <Checkbox></Checkbox>
                                                Product:{" "}
                                                {
                                                    product.Product.productName
                                                }{" "}
                                                Price: {product.Product.price}{" "}
                                                Quantity:{" "}
                                                {product.productQuantity}{" "}
                                                {"   "}
                                                <ButtonGroup
                                                    disableElevation
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            decrementQuantity(
                                                                product.ProductIdProduct,
                                                                product.OrderIdOrder,
                                                                product.productQuantity
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            incrementQuantity(
                                                                product.ProductIdProduct,
                                                                product.OrderIdOrder,
                                                                product.productQuantity
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </ButtonGroup>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </TableContainer>

                            <div>Suma este de {ordered.totalSum} RON</div>
                            <div>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="datetime-local"
                                        label="Product Id"
                                        type="number"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="datetime-local"
                                        label="Quantity"
                                        type="number"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>

                                <Button>Add Product</Button>
                                <Button>Finish Bill</Button>
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
                                <Button>Cancel Reservation</Button>
                                <Button>Start Order</Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            Aceasta masa este libera momentan!
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="datetime-local"
                                    label="Reservation Start Time:"
                                    type="datetime-local"
                                    defaultValue="2022-06-17T10:30"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    id="datetime-local"
                                    label="Number Of Hours:"
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                            <div>
                                <Button>Add Reservation</Button>
                                <Button>Start Order</Button>
                            </div>
                        </div>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
