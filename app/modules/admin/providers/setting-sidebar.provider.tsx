import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

interface ISettingSidebar {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}
const SettingSidebarContext = createContext<ISettingSidebar>({} as ISettingSidebar);
export const useSettingSidebar = () => {
    return useContext(SettingSidebarContext);
};
export const SettingSidebarProvider = ({ children }: { children: ReactNode; }) => {
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
    return (
        <SettingSidebarContext.Provider value={{ isOpen, onOpen, onClose, onToggle }}>
            {children}
        </SettingSidebarContext.Provider>
    );
};
