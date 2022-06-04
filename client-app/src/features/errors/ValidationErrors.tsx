import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: string[];
}

const ValidationErrors:React.FC<Props> = ({errors})=>{
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: string)=> (
                        <Message.Item key={err}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}

export default ValidationErrors;