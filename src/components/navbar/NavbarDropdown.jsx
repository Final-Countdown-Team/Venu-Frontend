

import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class NavbarDropdown extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        dropdownOpen: false
        };
    }
    
    toggle() {
        this.setState({
        dropdownOpen: !this.state.dropdownOpen
        });
    }
    
    render() {
        return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            {this.props.text}
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem><Link to="/login/artist">Artist</Link></DropdownItem>
            <DropdownItem><Link to="/login/venue">Venue</Link></DropdownItem>
            </DropdownMenu>
        </Dropdown>
        );
    }
    }