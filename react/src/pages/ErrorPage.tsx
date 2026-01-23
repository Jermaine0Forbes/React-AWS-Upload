// import React from "react";
import { useRouteError} from "react-router";

export default function ErrorPage()
{
    const err: unknown | any = useRouteError();
    console.error(err)

    return(
        <section>
            <p>{ err?.statusText || err?.message}</p>

        </section>

    );
}