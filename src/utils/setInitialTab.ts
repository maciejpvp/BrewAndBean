import type { Location } from "react-router-dom";

export const setInitialTab = (location: Location, slugs: string[]) => {
        const params = new URLSearchParams(location.search);
        const category = params.get("category");
        if (category) {
            return slugs.findIndex((slug) => slug === category);
        }
        return 0;
    }