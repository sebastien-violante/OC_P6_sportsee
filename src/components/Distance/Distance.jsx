import styles from './Distance.module.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
export default function Distance ({averageDistance, activities}) {

    return (
        <section className={styles.distance}>
              <div className={styles.header}>
                <div className={styles.data}>
                  <p className={styles.average}>{averageDistance}km en moyenne</p>
                  <div className={styles.selectDate}>
                    <img src="leftArrow.png" alt="période précédente" className={styles.arrow}></img>
                    <p> </p>
                    <img src="rightArrow.png" alt="période suivante" className={styles.arrow}></img>
                  </div>
                </div>
                <p className={styles.caption}>Total des kilomètres 4 dernières semaines</p>
              </div>
              <BarChart
                width={330}
                height={307}
                responsive
                data={activities}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width="auto" />
                <Tooltip />
                <Legend 
                    iconType="circle"
                    iconSize={8}
                    fill="#7987FF"
                />
                <Bar 
                    dataKey="distance" 
                    name="Km"
                    fill="#B6BDFC" 
                    activeBar={{ fill: '#0B23F4' }} 
                    radius={[30, 30, 30, 30]} 
                    barSize={14} />
                <RechartsDevtools />
              </BarChart>
            </section>
    )
}