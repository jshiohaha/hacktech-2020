import React from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import "./SearchBar.css";

interface ISearchBarProps {
    searchFunction: (query: string) => void;
    clearSearchResults: () => void;
}

interface ISearchBarState {
    searchInput: string;
    searchQueryExecuted: boolean;
}

export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
    // instantiate firebase handlers
    constructor(props: ISearchBarProps) {
        super(props);
        this.state = {
            searchInput: "",
            searchQueryExecuted: false
        };
    }

    handleSearchAction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ searchQueryExecuted: true });
        this.props.searchFunction(this.state.searchInput);
    }

    clearSearchAction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ searchQueryExecuted: false });
        this.props.clearSearchResults();
    }

    onChangeSearchInput = (text: string) => {
        this.setState({
            searchInput: text,
        });
    };

    render() {
        return (
            <div className="search-bar-container">
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="🔍 Search All Questions"
                        aria-label="Search Text Input"
                        aria-describedby="basic-addon2"
                        onChange={(e: any) => {
                            this.onChangeSearchInput(e.target.value);
                        }}
                    />
                    <InputGroup.Append>
                        <Button
                            variant={!this.state.searchQueryExecuted ? "primary" : "danger"}
                            onClick={!this.state.searchQueryExecuted ? this.handleSearchAction : this.clearSearchAction}
                        >
                            {this.state.searchQueryExecuted ? "Clear" : "Search"}
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    };
}


