import { movieApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
    constructor(props) {
        super(props);

        const {
            location: { pathname }
        } = props;

        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }
    async componentDidMount() {
        const {
            match: {
                params: { id }
            },
            history: { push }
        } = this.props;
        // console.log(typeof parseInt(id));



        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }

        console.log("isMovie: " + isMovie);
        let result = null;
        try {
            if (isMovie) {
                console.log("movie")
                ({ data: result } = await movieApi.movieDetail(parsedId));
            } else {
                console.log("tv")
                ({ data: result } = await tvApi.showDetail(parsedId));
            }
            // console.log(result);

        } catch (error) {
            this.setState({ error: "Cant't find anything." });
        } finally {
            this.setState({ loading: false, result });
        }
    }

    render() {
        console.log(this.props);
        const { result, error, loading } = this.state;
        return (
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
            />
        );

    }
}