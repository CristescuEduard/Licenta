import { Box, Button, Divider, Input } from "@chakra-ui/react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "react-use-disclosure";
import NavBarMain from "../../components/NavBarMain/NavBarMain";
import CustomModal from "../../components/customModal/CustomModal";
import "./Stock.css";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "inherit",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        maxHeight: "85%",
    },
    listSection: {
        backgroundColor: "inherit",
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0,
        justifyContent: "start",
    },
}));

function Stock() {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const [products, setProducts] = useState({});
    const [productsCopy, setProductsCopy] = useState({});
    const [product, setProduct] = useState(null);
    var subCategory = [];

    useEffect(() => {
        try {
            axios.get("http://localhost:8080/getProducts").then((res) => {
                const productDB = res.data;
                setProducts(productDB);
                setProductsCopy(productDB);
            });
        } catch (err) {
            console.error(err.response);
        }
    }, []);

    Array.from(products).map((product) =>
        subCategory.push(product.subCategory)
    );

    subCategory = Array.from(subCategory).filter(onlyUnique);

    var { isOpen, open, close } = useDisclosure();

    const classes = useStyles();

    return (
        <div className="Stock">
            <NavBarMain />
            <Box w="30%" overflow="hidden" h="40%">
                <div className={classes.root}>
                    <Input
                        placeholder="Search Product"
                        onChange={(valueString) => {
                            var sir = [];
                            Array.from(products)
                                .filter(
                                    (product) =>
                                        product.productName.indexOf(
                                            valueString.currentTarget.value
                                        ) > -1
                                )
                                .every((product) => sir.push(product));
                            setProductsCopy(sir);
                        }}
                    />
                </div>
                <List className={classes.root} subheader={<li />}>
                    {Array.from(subCategory).map((subCategor) => (
                        <li
                            key={`section-${subCategor}`}
                            className={classes.listSection}
                        >
                            <ul className={classes.ul}>
                                <ListSubheader disableSticky={true}>
                                    {subCategor}
                                </ListSubheader>

                                {Array.from(productsCopy)
                                    .filter(
                                        (item) =>
                                            item.subCategory === subCategor
                                    )
                                    .map((item) => (
                                        <div key={item.idProduct}>
                                            <Divider />
                                            <ListItem
                                                key={item.idProduct}
                                                role={undefined}
                                                dense
                                                button
                                            >
                                                <ListItemText
                                                    id={item}
                                                    primary={
                                                        item.productName
                                                        // + " price:" +
                                                        // item.price +
                                                        // " quantity: " +
                                                        // item.totalQuantity
                                                    }
                                                />
                                                <div className={classes.ul}>
                                                    <Box w="30%">
                                                        <ListItemSecondaryAction>
                                                            <Button
                                                                onClick={() => {
                                                                    setProduct(
                                                                        item
                                                                    );
                                                                    open();
                                                                    isOpen = true;
                                                                }}
                                                            >
                                                                See Product{" "}
                                                            </Button>
                                                        </ListItemSecondaryAction>
                                                    </Box>
                                                </div>
                                            </ListItem>
                                        </div>
                                    ))}
                                <Divider />
                            </ul>
                        </li>
                    ))}
                </List>
            </Box>
            <div align="center">
                <Button
                    onClick={() => {
                        setProduct(null);
                        open();
                        isOpen = true;
                    }}
                >
                    Add Product
                </Button>
            </div>
            <CustomModal
                subCategory={subCategory}
                close={close}
                isOpen={isOpen}
                product={product}
            />
        </div>
    );
}

export default Stock;
