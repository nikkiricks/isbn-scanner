require('dotenv').config();


bookTitle = context.Request.QueryString["bookTitle"];
bookAuthor = context.Request.QueryString["bookAuthor"];

context.Response.ContentType = "application/json";

function getBookInformation() {
	$.get('goodreadsHttpHandler.ashx'
	, { bookAuthor: $('#authorTextbox').val(), bookTitle: $('#titleTextbox').val() }
	, function (data) {
	}
	);
}

public string GetGoodreadsURI(string bookAuthor, string bookTitle)
{
    string myKey = keyManager.GetConfigurationByKey("goodreadsDeveloperKey");
    string uri = "http://www.goodreads.com/book/title?format={0}&author={1}&key={2}&title={3}";
    return String.Format(uri, "xml", bookAuthor, myKey, bookTitle);
}