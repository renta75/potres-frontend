
import { HelpCategory } from './helpCategory';
import { HelpFields } from './helpFields';
import { Status } from './status';

export class Help{
	id : number;
	
	
	category : HelpCategory;
	
	
	
	title : string;
	
	
	
	description : string;
	
	
	
	contact : string;
	
	
	
	fields : HelpFields[];
	
	
	
	locationLat : number;
	
	
	
	locationLng : number;
	
	
	
	status : Status;
	
	
	
	createdDateTime : Date;
	
	
	
	editedDateTime : Date;
	
	
	
	bulk : string;
	
	
	
	
	categoryId : number;
	categoryName : string;
	
	
	
	fieldsId : number;
	fieldsName : string;
	
	
	
	statusId : number;
	statusName : string;
	
	
	
}
		 
