export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout: (component: NextComponentType) => JSX.Element;
};
export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}