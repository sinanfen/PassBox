$(document).ready(function () {

    tinymce.init({
        selector: 'textarea.editor',      //<textarea> etiketinin 'editor' classına uygulanır
        plugins: 'advlist anchor fullscreen autolink charmap preview codesample code emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'language | undo redo | fullscreen | blocks fontfamily fontsize codesample code styleselect  fontselect  fontsizeselect | bold italic underline strikethrough | forecolor backcolor |link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        color_default_background: 'white',      
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        fontsize_formats: "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
        height: '700px',
        toolbar_sticky: true,
        mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
        ],
        font_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats; Open Sans=sans serif;',
        content_style: "body { font-family: Helvetica; font-size:14pt;}",

        content_langs: [
            { title: 'English', code: 'en' },
            { title: 'Spanish', code: 'es' },
            { title: 'French', code: 'fr' },
            { title: 'German', code: 'de' },
            { title: 'Portuguese', code: 'pt' },
            { title: 'Chinese', code: 'zh' },
            { title: 'Turkish', code: 'tr' }
        ],
        spellchecker_language: 'US English=en_US,TR Turkish=tr_TR',
        color_map: [
            '#BFEDD2', 'Light Green',
            '#FBEEB8', 'Light Yellow',
            '#F8CAC6', 'Light Red',
            '#ECCAFA', 'Light Purple',
            '#C2E0F4', 'Light Blue',

            '#2DC26B', 'Green',
            '#F1C40F', 'Yellow',
            '#E03E2D', 'Red',
            '#B96AD9', 'Purple',
            '#3598DB', 'Blue',

            '#169179', 'Dark Turquoise',
            '#E67E23', 'Orange',
            '#BA372A', 'Dark Red',
            '#843FA1', 'Dark Purple',
            '#236FA1', 'Dark Blue',

            '#ECF0F1', 'Light Gray',
            '#CED4D9', 'Medium Gray',
            '#95A5A6', 'Gray',
            '#7E8C8D', 'Dark Gray',
            '#34495E', 'Navy Blue',

            '#000000', 'Black',
            '#ffffff', 'White'
        ]
    });
});