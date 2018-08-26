import React from 'react'
const Form = (props) => {

    return (
        <form id="uploadForm"
            onSubmit={props.formHandler}
        >
            <div className="form-group">
                <label >File input</label>
                <input type="file" name="file" className="form-control-file"
                    id="exampleInputFile" aria-describedby="fileHelp" />
                <small id="fileHelp" className="form-text text-muted">
                    This is some placeholder block-level help text for the above input.
                    It's a bit lighter and easily wraps to a new line.
    </small>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
	)

}

export default Form;