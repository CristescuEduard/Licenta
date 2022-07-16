import {
    Button,
    FormControl,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    NumberInput,
    ModalOverlay,
    FormLabel,
    NumberInputStepper,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import "./AdminModal.css";
export default function AdminModal({ isOpen, close, table, idMasa }) {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [orientation, setOrientation] = useState(
        table ? table.orientation : ""
    );
    const [persons, setPersons] = useState(table ? table.tableSize : 0);

    const deleteTable = async (e) => {
        axios.delete("http://localhost:8080/deleteTable/" + table.idTable);
        window.location.reload(false);
    };

    const updateTable = async (e) => {
        axios.put("http://localhost:8080/updateTable/" + table.idTable, {
            tableSize: persons,
            orientation: orientation,
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
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{idMasa}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Number of Persons</FormLabel>
                        <NumberInput
                            defaultValue={table ? table.tableSize : 0}
                            onChange={(valueString) =>
                                setPersons(parseInt(valueString))
                            }
                            placeholder="aasda"
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
                            defaultValue={table ? table.orientation : 0}
                            onChange={(valueString) =>
                                setOrientation(valueString.currentTarget.value)
                            }
                        >
                            <option value="Horizontal">Horizontal</option>
                            <option value="Vertical">Vertical</option>
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={updateTable}>Modify</Button>
                    <Button onClick={deleteTable}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
