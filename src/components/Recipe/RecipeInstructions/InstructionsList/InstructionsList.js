import React from 'react'
import './InstructionsList.css'

import agent from '../../../../agent'
import { connect } from 'react-redux'

import InstructionIngredientList from '../InstructionIngredientList/InstructionIngredientList'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

const mapDispatchToProps = dispatch => ({
    completeInstruction: id => 
        dispatch({
            type: 'RECIPE_PAGE_COMPLETED_INSTRUCTION',
            payload: agent.CompletedInstructions.complete(id)
    }),
})

const COMPLETE_CLASS = 'completeButton';
const UNCOMPLETED_CLASS = 'uncompleteButton';

const InstructionsList = props => {
    if (!props.instructions) {
        return (
            <div>
                loading..
            </div>
        )
    }

    if (props.instructions.length === 0) {
        return (
            <div>
                No Instructions
            </div>
        )
    }

    props.instructions.sort((a, b) => a.display_order>b.display_order ? 1 : -1)

    return (
        <div>
            {
                props.instructions.map(instruction => {
                    const completeInstructionHandler = () => {
                        props.completeInstruction(instruction.id)
                    }

                    const completedButtonClass = instruction.is_completed ? UNCOMPLETED_CLASS : COMPLETE_CLASS

                    return (
                            <div key={instruction.id}>
                                <Row className="instructionsList__pair" >
                                    <Col className="instructionsList__body">
                                        <span>{instruction.display_order}. {instruction.body}</span>
                                        <InstructionIngredientList
                                            instruction_ingredients={instruction.instruction_ingredients}/>
                                    </Col>
                                    <Col xs={2} sm md lg={1}>
                                        <button className="instructionsList__complete"
                                            onClick={() => {props.currentUser ? completeInstructionHandler() : props.registerHandler()}}>
                                                {instruction.is_completed ? <CheckCircleOutlinedIcon className={completedButtonClass}/> 
                                                    : <RadioButtonUncheckedIcon className={completedButtonClass}/>}
                                        </button>
                                    </Col>
                                </Row>

                            </div>
                    )
                })
            }    
        </div>
    )
}

export default connect(() => ({}), mapDispatchToProps)(InstructionsList)

