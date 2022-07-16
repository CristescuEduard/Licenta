import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "1370px",
        border: "solid",
        background: "azure",
        height: "200%",
        overflow: "auto",
    },
}));
function Recipe() {
    const classes = useStyles();
    const [kitchenProducts, setKitchenProducts] = useState({});
    useEffect(() => {
        try {
            axios
                .get("http://localhost:8080/getProductsByCategory/")
                .then((res) => {
                    const ordersDB = res.data;
                    setKitchenProducts(ordersDB);
                });
        } catch (err) {
            console.error(err.response);
        }
    }, []);

    return (
        <div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {Array.from(kitchenProducts).map((product) => (
                        <Grid item key={product.idProduct}>
                            {" "}
                            <div>
                                <Accordion allowMultiple>
                                    <AccordionItem>
                                        {({ isExpanded }) => (
                                            <>
                                                <h2>
                                                    <div className="Item">
                                                        <AccordionButton>
                                                            <Box
                                                                flex="1"
                                                                textAlign="left"
                                                            >
                                                                {
                                                                    product.productName
                                                                }
                                                                {"   "}
                                                            </Box>
                                                            {isExpanded ? (
                                                                <MinusIcon fontSize="12px" />
                                                            ) : (
                                                                <AddIcon fontSize="12px" />
                                                            )}
                                                        </AccordionButton>
                                                    </div>
                                                </h2>

                                                <AccordionPanel pb={4}>
                                                    <div className="Content">
                                                        {" "}
                                                        Table: {} start hour:{" "}
                                                        duration: hours
                                                        <Button variant="ghost">
                                                            <DeleteIcon></DeleteIcon>
                                                        </Button>
                                                    </div>
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}
export default Recipe;
