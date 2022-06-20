import React, { useState, useEffect } from "react";
import "./Admin.css";
import Example from "./utile/Example";
import { DndProvider } from "react-dnd";
import NavBarMain from "../../components/NavBarMain/NavBarMain";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Select,
    Input,
    Popover,
    Portal,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Textarea,
    PopoverArrow,
    PopoverCloseButton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { useDisclosure } from "react-use-disclosure";
import axios from "axios";

function Admin() {
    const [orientation, setOrientation] = useState("Horizontal");
    const [tableSize, setTableSize] = useState(4);
    const [layoutName, setLayoutName] = useState("");
    const [activeLayoutName, setActiveLayoutName] = useState("");
    const [idLayout, setIdLayout] = useState(0);
    const [layouts, setLayouts] = useState({});

    var tableName;

    useEffect(() => {
        try {
            axios.get("http://localhost:8080/getLayouts").then((res) => {
                const layoutDB = res.data;
                setLayouts(layoutDB);
            });
        } catch (err) {
            console.error(err.response);
        }
    }, []);

    useEffect(() => {
        try {
            axios.get("http://localhost:8080/getLayout").then((res) => {
                const layoutDB = res.data;
                setActiveLayoutName(layoutDB.layoutName);
                setIdLayout(layoutDB.idLayout);
            });
        } catch (err) {
            console.error(err.response);
        }
    }, []);

    const addTable = async (e) => {
        tableName = "Masa";
        axios.post("http://localhost:8080/addTable", {
            tableName,
            orientation,
            tableSize,
            idLayout,
        });
        window.location.reload(false);
    };

    const addLayout = async (e) => {
        axios.post("http://localhost:8080/addLayout", {
            layoutName,
        });
        window.location.reload(false);
    };

    const setActive = async (e) => {
        axios.put("http://localhost:8080/setActive", {
            idLayout,
        });
        window.location.reload(false);
    };

    const OverlayOne = () => (
        <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />
    );

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    var { isOpen, open, close } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

    return (
        <div className="AdminPage">
            <NavBarMain />
            <DndProvider backend={HTML5Backend}>
                <Example idLayout={idLayout} />
            </DndProvider>
            <div>
                <Button
                    onClick={() => {
                        setOverlay(<OverlayOne />);
                        open();
                        isOpen = true;
                    }}
                >
                    Add Table
                </Button>
                <Select
                    placeholder={activeLayoutName}
                    onChange={(valueString) =>
                        setIdLayout(parseInt(valueString.currentTarget.value))
                    }
                >
                    {Array.from(layouts).map((lay) => (
                        <option key={lay.idLayout} value={lay.idLayout}>
                            {lay.layoutName}
                        </option>
                    ))}
                </Select>
                <Popover>
                    <PopoverTrigger>
                        <Button>Add Layout</Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                <div className="pop">
                                    <Input
                                        id="layoutName"
                                        variant="flushed"
                                        placeholder="Layout Name"
                                        onChange={(valueString) =>
                                            setLayoutName(
                                                valueString.currentTarget.value
                                            )
                                        }
                                    />
                                    <Button
                                        colorScheme="blue"
                                        onClick={addLayout}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
                <Button colorScheme="blue" onClick={setActive}>
                    SetActive
                </Button>
                <Textarea
                    placeholder={
                        "The current active layout is : " + activeLayoutName
                    }
                />
            </div>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={close}
            >
                {overlay}
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create table</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Table Size</FormLabel>
                            <NumberInput
                                defaultValue={4}
                                step={2}
                                min={4}
                                max={20}
                                onChange={(valueString) =>
                                    setTableSize(parseInt(valueString))
                                }
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Type of Table</FormLabel>
                            <Select
                                onChange={(valueString) =>
                                    setOrientation(
                                        valueString.currentTarget.value
                                    )
                                }
                            >
                                <option value="Horizontal">Horizontal</option>
                                <option value="Vertical">Vertical</option>
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Select Layout</FormLabel>
                            <Select
                                onChange={(valueString) =>
                                    setIdLayout(
                                        parseInt(
                                            valueString.currentTarget.value
                                        )
                                    )
                                }
                            >
                                {Array.from(layouts).map((lay) => (
                                    <option
                                        key={lay.idLayout}
                                        value={lay.idLayout}
                                    >
                                        {lay.layoutName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={addTable}>
                            Save
                        </Button>
                        <Button onClick={close}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Admin;
