
import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import Button from './Button';
import { WORKOUTS, SCHEMES } from '../utils/gymbro'


function Header(props) {
    const { index, title, description } = props;

    return(
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
                <p className="text-3xl sm:text-4xl md:text-5xl
                font-semibold text-slate-400">{index}</p>
                <h4 className="text-xl sm:text-2xl md:text-3xl
                ">{title}</h4>
            </div>
            <p className="text-sm sm:text-base mx-auto
            ">{description}</p>
        </div>
    )
}

export default function Generator(props) {
    
    const { poison, setPoison, muscles, setMuscles, goal, setGoal, updateWorkout } = props;
    const [showModel, setShowModel] = useState(false);
    
    
    function toggleModel() {
        setShowModel(!showModel);
    }

    function updateMuscles(muscleGroup) {
        if (muscles.includes(muscleGroup)) {
            setMuscles(muscles.filter((val) => {
                val !== muscleGroup;
                return;
            }))
        }
        if (muscles.length > 3) {
            return;
        }
        if (poison !== 'individual') {
            setMuscles([muscleGroup]);
            return;
        }

        setMuscles([...muscles, muscleGroup]);
        if (muscles.length === 3) {
            setShowModel(false);
        }
    }

    return (
        <>
            <SectionWrapper id={'generate'} header={'generate your workout'} 
                title={['It\'s', 'Huge', 'o\'clock']}>
                <Header index={"01"} title={"Pick your poison"}
                description={"Select the workout you to endure"} />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Object.keys(WORKOUTS).map((type, typeIndex) => {
                        return(
                            <button onClick={() => {
                                setMuscles([]);
                                setPoison(type);
                            }} className={`bg-slate-950 border-blue-400
                            hover:border-blue-600 border py-4 
                            rounded-lg duration-200 ${type === poison ? `border-blue-600` : 
                                `border-blue-400`
                            }`} key={typeIndex}>
                                <p className='capitalize
                                '>{type.replace('_', " ")}</p>
                            </button>
                        )
                    })}
                </div>
                <Header index={"02"} title={"Lock on target"}
                description={"Select the muscles judjed for annihilation"} />
                <div className="flex flex-col gap-4 items-center 
                justify-center bg-slate-950 border 
                border-blue-400 p-3 rounded-lg">
                    <button onClick={toggleModel} className="
                    relative w-full flex items-center justify-center">
                        <p className="capitalize">
                            {
                                muscles.length === 0 ? "select muscle group" : 
                                muscles.join(" ")
                            }
                        </p>
                        <i className="fa-solid absolute 
                        right-3 top-1/2 -translate-y-1/2 
                        fa-caret-down"></i>
                    </button>
                    {showModel && (
                    <div className='flex flex-col gap-3'>
                        {(poison === 'individual' ? WORKOUTS[poison] : 
                            Object.keys(WORKOUTS[poison])).map(
                                (muscleGroup, muscleGroupIndex) => {
                                    return(
                                        <button onClick={
                                            () => {
                                                updateMuscles(muscleGroup);
                                            }
                                        }
                                        key={muscleGroupIndex} 
                                        className={`hover:text-blue-400 duration-200
                                        ${muscles.includes(muscleGroup) ? 'text-blue-400' : ' '}`}>
                                            <p className="uppercase">
                                                {muscleGroup}
                                            </p>
                                        </button>
                                    )
                                }
                            )
                        }
                    </div>
                    )}
                </div>
                <Header index={"03"} title={"Become Juggernaut"}
                description={"Select ypur ultimate objective"} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
                        return(
                            <button onClick={() => {
                                setGoal(scheme);
                            }} className={`bg-slate-950 border-blue-400
                            hover:border-blue-600 border py-4 
                            rounded-lg duration-200 ${scheme === goal ? `border-blue-600` : 
                                `border-blue-400`
                            }`} key={schemeIndex}>
                                <p className='capitalize
                                '>{scheme.replace('_', " ")}</p>
                            </button>
                        )
                    })}
                </div>
                <Button func={updateWorkout} text={"Formulate"} />
            </SectionWrapper>
        </>
    )
}
