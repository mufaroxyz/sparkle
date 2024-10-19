export const getElement= <T>(s: string) => {
    try {
        const element = document.querySelector(s) as T;

        if(!element) {
            return { error: `Element with selector ${s} not found` };
        }

        return element;

    } catch (e) {
        if(e instanceof Error) {
            return { error: e.message };
        }

        return { error: 'An error occurred', e };
    }
}