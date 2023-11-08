
import LeerlingInformatie from '@/components/LeerlingInformatie';
import Typography from '@/components/typography';
import { fetchStudent, getStudent } from '@/hook/students-info';
import { poppins } from '@/lib/fonts';
import Link from 'next/link';

interface PageProps {
    params: { leerlingdetails : string, vak:  string };
}


export default async function Page ({params: {leerlingdetails, vak}} : PageProps ) {
    const studentDetails = await getStudent(leerlingdetails)

    console.log('studentDetails', studentDetails)
    // Assuming the slug is named "leerling-details" based on the filename
    

    if (!leerlingdetails) {
        // This handles the case where the slug is not available yet, e.g., during an initial load.
        return <div>Loading...</div>;
    }
    
    return (
        <section>
            <Typography variant = 'title' className={`text-quintary lg:text-4xl font-medium ${poppins.className}`}>
            
                <Link href = {`/authenticated/leerling-overzicht`} className='font-medium hover:text-quadrairy/80 mr-4'>Leerling Overzicht</Link>
                 / 
                 <Link href = {`/authenticated/leerling-overzicht/${leerlingdetails}`} className='font-medium hover:text-quadrairy/80 mx-4'>{studentDetails.naam} {studentDetails.achternaam}</Link> 
                 / 
                 <span className='ml-4'>{vak}</span>
            </Typography>
            <Typography variant = 'muted' className={`text-[#8D94A0] mt-4 lg:text-md ${poppins.className} max-w-[1200px]`}>Op deze pagina kan je vertellen hoe een leerling zich gedraagt in de les
            Wat zijn de sterke punten en wat zijn de verbeterpunten? Hoe is de werkhouding, het inzicht en de kennis van de leerling?
            </Typography>
            <hr className="max-w-[1200px] h-[2px] mt-3 bg-[#DBDBDB]" />
            <div className='grid grid-cols-2 gap-8 max-w-[1200px] mt-16'>
                {studentDetails.vak_ratings.map((detail : any) => {
                    return (
                        <Link href = {`/authenticated/leerling-overzicht/${leerlingdetails}/${detail.vak.naam}`} className='border rounded-xl border-quadrairy px-6 py-4 flex justify-between'>
                            <Typography variant='muted'>{detail.vak.naam}</Typography>
                            <Typography variant='muted' style={{ color: getGradeColor(detail.cijfer) }}>{detail.cijfer}</Typography>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}


function getGradeColor(grade : number) {
    if (grade > 6.5) return 'green';
    if (grade >= 5.5 && grade <= 6.5) return 'orange';
    return 'red';
}