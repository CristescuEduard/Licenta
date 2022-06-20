import React from "react";
import { useDisclosure } from "react-use-disclosure";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
} from "@chakra-ui/react";

function Modala() {
    const OverlayOne = () => (
        <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />
    );

    const { isOpen, open, close } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

    return (
        <>
            <Button
                onClick={() => {
                    setOverlay(<OverlayOne />);
                    open();
                }}
            >
                Use Overlay one
            </Button>
            <Modal isCentered isOpen={isOpen}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Custom backdrop filters!</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={close}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Modala;
