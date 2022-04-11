
import { HelpCategory } from './helpCategory';
import { NeedFields } from './needFields';
import { Status } from './status';

export class Need{
	id : number;
	
	
	category : HelpCategory;
	
	
	
	title : string;
	
	
	
	description : string;
	
	
	
	contact : string;
	
	
	
	fields : NeedFields[];
	
	
	
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
		 
