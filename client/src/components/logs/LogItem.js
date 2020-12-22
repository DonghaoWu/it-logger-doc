import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteLog, setCurrent, clearCurrent } from '../../actions/logActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const LogItem = ({ log, deleteLog, setCurrent }) => {

    const handleDelete = () => {
        deleteLog(log.id);
        M.toast({ html: 'Log deleted.' })
    }

    return (
        <li className="collection-item">
            <div>
                <a
                    href='#edit-log-modal'
                    className={`modal-trigger ${log.attention ? 'red-text' : 'blue-text'}`}
                    onClick={() => setCurrent(log)}
                >
                    {log.message}
                </a>
                <br />
                <span className='grey-text'>
                    <span className="black-text">ID #{log.tech}</span>
                    <br />
                    last updated by {``} <span className="black-text">{log.tech}</span> on{' '} <Moment format="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
                </span>
                <a href="#!" onClick={handleDelete} className="secondary-content">
                    <i className="material-icons grey-text">delete</i>
                </a>
            </div>
        </li>
    )
}

LogItem.propTypes = {
    log: PropTypes.object.isRequired,
    deleteLog: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    clearCurrent: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    deleteLog: (id) => dispatch(deleteLog(id)),
    setCurrent: (log) => dispatch(setCurrent(log)),
    clearCurrent: () => dispatch(clearCurrent())
})

export default connect(null, mapDispatchToProps)(LogItem);