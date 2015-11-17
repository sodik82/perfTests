package sk.instea.perfTest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book")
public class BookController {

	@RequestMapping("{page}")
	public List<Book> searchByPage(@PathVariable Long page) {
		return generate(page * 20, 20);
	}

	private List<Book> generate(long startIdx, int count) {
		List<Book> list = new ArrayList<Book>(count);
		for (int i = 0; i < count; i++) {
			Book book = new Book();
			book.setId(startIdx + i);
			book.setName("test name");
			list.add(book);
		}
		return list;
	}
}
