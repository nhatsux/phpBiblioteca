import {Student} from './Student.interface.js'
var listAlumns = 
[
new Student('16010201','Acuña','Taboada','Andres',true,1,true),
new Student('16010202','Alamo','Rollandi','Roxana',false,3,true),
new Student('16010203','Amenabar','Moreno','Maria',true,4,true),
new Student('16010204','Araneda','Castiglioni','Ignacio',false,5,true),
new Student('16010205','Bäuerle','Concha','Catalina',true,6,true),
new Student('16010206','Bertonati','Ruiz','Antonio',false,7,false),
new Student('16010207','Busta','Perez','Luis',false,4,true),
new Student('16010208','Canales','Contreras','Felipe',true,1,false),
new Student('16010209','Petraello' ,'Contreras','Giovanna' ,false,2,true),
new Student('16010210','Dattari','Carcher','Carlos',false,5,true),
new Student('16010211','Pereira','De Gracia','Francisco',true,6,true),
new Student('16010212','Pinto','Toledo','Fernanda',true,7,true),
new Student('16010213','Poblete','Farias','Hernan',false,7,true)    
]

function findStudent (numControl){
   
    return listAlumns.find(alumn =>  alumn.matricula == numControl)
}

export {findStudent}