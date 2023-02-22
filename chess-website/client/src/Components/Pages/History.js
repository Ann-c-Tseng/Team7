import React from 'react';
import './History.css'

export default function History() {
    return (
        <div className='history'>
            <h1 className='title'>Your Game History</h1>
            <table>
                <thead>
                    <tr className='header'>
                        <th></th>
                        <th>Opponent</th>
                        <th>Result</th>
                        <th>Moves</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='entry'>
                        <td>5:03</td>
                        <td className='player'>Alan</td>
                        <td>Win</td>
                        <td>24</td>
                        <td>2023-02-20</td>
                    </tr>
                    <tr className='entry'>
                        <td>5:03</td>
                        <td className='player'>Saunder</td>
                        <td>Win</td>
                        <td>24</td>
                        <td>2023-02-20</td>
                    </tr>
                    <tr className='entry'>
                        <td>5:03</td>
                        <td className='player'>Barack Obama</td>
                        <td>Win</td>
                        <td>24</td>
                        <td>2023-02-20</td>
                    </tr>
                    <tr className='entry'>
                        <td>5:03</td>
                        <td className='player'>Joe</td>
                        <td>Win</td>
                        <td>24</td>
                        <td>2023-02-20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}