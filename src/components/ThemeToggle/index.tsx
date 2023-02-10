import { useEffect, useState } from "react";
import Checkbox from "../Checkbox";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") ?? "light");

    function handleClick() {
        console.log("button clicked");
        setTheme(theme === "light" ? "dark" : "light");
    }

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <Checkbox
            checked={theme === "dark"}
            id="darkmode"
            disabled={false}
            handleOnChange={handleClick}
            label={"Dark"}
        />
    );
}
