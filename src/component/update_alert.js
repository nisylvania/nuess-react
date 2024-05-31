import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function UpdateAlert() {
    const [show, setShow] = useState(true);

    let d = new Date();
    let alert = "";
    if ((d.getMonth() + 1 === 3 || d.getMonth() + 1 === 9) && show) {
        alert = <Alert key='danger' variant='danger' onClose={() => setShow(false)} dismissible>
            現在の時期はシラバス更新の時期に当たるため，不正確な情報を表示している可能性があります。
        </Alert>
    }
    else {
        alert = "";
    }

    return (
        <>
            {alert}
        </>
    );
}

export default UpdateAlert;