import React from 'react';
import { connect } from 'react-redux';
import { toggleDemo } from 'Store/demo/action';

class Index extends React.PureComponent {
    render() {
        return (
            <div>
                Login toggle {this.props.toggle ? ' true' : 'false'}
                <button onClick={this.props.toggleDemo}>Toggle</button>
            </div>
        );
    }
}

const mapStateToProps = ({ demo: { toggle } }) => ({ toggle });

export default connect(
    mapStateToProps,
    { toggleDemo }
)(Index);
