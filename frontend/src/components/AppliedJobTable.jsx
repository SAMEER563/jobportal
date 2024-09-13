import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (

    // Table for Applied Jobs

    <div>
       <Table>
        <TableCaption>List of your Applied Jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead classname='text-right'>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                [1,2,3,4].map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>13-09-2024</TableCell>
                        <TableCell>Frontend Developer</TableCell>
                        <TableCell>Google</TableCell>
                        <TableCell classname='text-right'><Badge>Selected</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
       </Table>
    </div>
  )
}

export default AppliedJobTable