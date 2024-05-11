import { Card ,CardContent,Typography} from '@mui/material'
import React from 'react'


function Home() {
    return (
        <>
            <Typography variant="h1" style={{ textAlign: 'center', marginTop: '20px' }}>
            Welcome to BidZone
            </Typography>
            <Typography variant="h3" style={{ textAlign: 'center', marginTop: '20px' }}>
            Your Bid, Your Power, Your Victory!
            </Typography>
            <Card style={{ width: '50%', margin: 'auto', marginTop: '50px', padding: '20px' }}>
                <CardContent>
                    <Typography variant="h5" style={{ color: 'blue' }}>
                       Sell Here 
                    </Typography>
                    <Typography variant="body2">
                        <a href="#">For Sellers</a>
                    </Typography>
                    
                </CardContent>
            </Card>
            <Card style={{ width: '50%', margin: 'auto', marginTop: '50px', padding: '20px' }}>
                <CardContent>
                    <Typography variant="h5" style={{ color: 'blue' }}>
                       Bid Here
                    </Typography>
                    <Typography variant="body2">
                         <a href="#">For Bidders</a>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}export default Home;

