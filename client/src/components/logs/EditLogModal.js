import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = () => {

    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState('');

    const onSubmit = () => {
        if (message === '' || tech === '') {
            M.toast({ html: 'Please enter a message and tech.' })
        }
        else {
            console.log(message, attention, tech);
            setMessage('');
            setAttention(false);
            setTech('');
        }
    }

    return (
        <div id="edit-log-modal" className="modal" style={modalStyle} >
            <div className="modal-content">
                <h4> Edit System Log</h4>
                <div className='row'>
                    <div className="input-field">
                        <input type='text' name="message" value={message} placeholder='current log' onChange={e => setMessage(e.target.value)} />
                    </div>
                </div>
                <div className='row'>
                    <div className="input-field">
                        <select name="tech" value={tech} className='browser-default' onChange={e => setTech(e.target.value)}>

                            <option value='' disabled>Select Techician</option>
                            <option value='John Doe'>John Doe</option>
                            <option value='Sam Smith'>Sam Smith</option>
                            <option value='Marry Jenifer'>Marry Jenifer</option>
                        </select>
                    </div>
                </div>

                <div className='row'>
                    <div className="input-field">
                        <p>
                            <label>
                                <input type='checkbox' className='filled-in' checked={attention} value={attention}
                                    onChange={e => setAttention(!attention)}
                                />
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>


            <div className='modal-footer'>
                <a href='#' onClick={onSubmit} className='modal-close waves-effect waves-green btn blue'>Enter</a>
            </div>
        </div>
    )
}

const modalStyle = {
    width: '75%',
    height: '75%'
}

export default EditLogModal;